import { Component } from 'angular2/core';
import { Auth } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import { FirebaseService } from './firebase.service';
import {ProfileComponent} from './profile.component';
import {LeaderboardComponent} from './leaderboard.component';
import {QuestComponent} from './quest.component';
import {Quest} from './quest.model';
import {InputFormComponent} from './inputs.component';

@Component({
  selector: 'my-app',
  template: `
    <div class="banner">
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-3" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/"><img id="sword" src="/resources/img/sword-icon.png" alt="no img found" /></a>

          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="navbar-collapse-3">
            <ul class="nav navbar-nav" *ngIf="auth.authenticated()">
              <li>  <a (click)="hideMain()" [routerLink]="['Profile']">{{auth.userProfile.nickname}}: {{auth.userProfile.user_metadata.score}}</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li class="divider"><a href="#">Quests</a></li>
              <li><a (click)="hideMain()" [routerLink]="['Leaderboard']">ScoreBoard</a></li>
              <li *ngIf="!auth.authenticated()" class="divider"><a (click)="auth.login()">Login</a></li>
              <li *ngIf="auth.authenticated()" class="divider"><a (click)="auth.logout()">Logout</a></li>
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>
    </div>
    <div *ngIf="showMain">
      <div class="main-content">
        <h1 id="title">World Adventure</h1>

        <div id="buttons">
          <div class="container" align="center">
            <div class="row">
              <div (click)="goToQuest('romance')"class="btn-danger col-sm-3 big-button love">
                <h2>Romance</h2>
              </div>
              <div (click)="goToQuest('journey')"class="col-sm-3 big-button journey">
                <h2>Journey</h2>
              </div>
            </div>
            <div class="row">
              <div (click)="goToQuest('adventure')" class="col-sm-3 big-button adventure">
                <h2>Adventure</h2>
              </div>
              <div *ngIf="auth.authenticated()">
                <div (click)="hideMain()" [routerLink]="['Oracle']" class="col-sm-3 big-button oracle">
                  <h2>Create your own Quest</h2>
                </div>
              </div>
              <div *ngIf="!auth.authenticated()">
                <div class="col-sm-3 big-button oracle">
                  <h2>Login to create your own quest!</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div><img id="dragon" src="/resources/img/dragon-animated.gif" alt="no img found" /></div>
      </div>
    </div>
    <router-outlet></router-outlet>
    `,
  providers: [ Auth, FirebaseService ],
  directives: [ ROUTER_DIRECTIVES ]
})
@RouteConfig([
  {path: "/profile", name: "Profile", component: ProfileComponent},
  {path: "/oracle", name: "Oracle", component: InputFormComponent},
  {path: "/leaderboard", name: "Leaderboard", component: LeaderboardComponent},
  {path: "/quest:/quest_id", name: "Quest", component: QuestComponent}
])

export class AppComponent {
  public showMain = true;
  responseFirebase: any;
  firebaseKeys: Array<string>;

  constructor( private auth: Auth, private authHttp: AuthHttp, private _firebaseService: FirebaseService, private router: Router ) {
    if(localStorage.getItem('profile')) {
      var storedScore = JSON.parse(localStorage.getItem('profile')).user_metadata.score;
      var headers: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      var data: any = JSON.stringify({
        user_metadata: {
          score: storedScore
        }
      });
      if(this.auth.userProfile.user_metadata.score < storedScore) {
        this.authHttp
          .patch('https://' + 'callanmcnulty.auth0.com' + '/api/v2/users/' + this.auth.userProfile.user_id, data, {headers: headers})
          .subscribe(
            response => {
            	//Update profile
              var storage = JSON.parse(localStorage.getItem('profile'));
              storage.user_metadata.score = storedScore;
              localStorage.setItem('profile', JSON.stringify(storage));
              this.auth.userProfile.user_metadata.score = storedScore;
            },
            error => alert(error.json().message)
          );
      }
    }
  }
  goToQuest(id) {
    this.router.navigate( ['Quest', { quest_id: id }] );
  }
  hideMain() {
    this.showMain = false;
    console.log("button activated");
  }
}
