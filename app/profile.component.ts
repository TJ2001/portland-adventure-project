import { Component } from 'angular2/core';
import { Pipe, PipeTransform } from 'angular2/core';
import { Auth } from './auth.service';
import { FirebaseService } from './firebase.service';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import { DateFormatPipe} from './date-format.pipe';
declare var moment: any;
@Component({
  styleUrls: ['app/profile.css'],
  providers: [ Auth, FirebaseService ],
  pipes: [DateFormatPipe],
  template:`
  <div class="main-content">
    <h2>{{auth.userProfile.nickname}}'s Profile</h2>
    <div class="container">
      <div class="col-md-6 user-info">
        <h3>Your Score: {{auth.userProfile.user_metadata.score}}</h3>
        <h3>You have been a member since:</h3>
        <h4 id="date">{{auth.userProfile.created_at | dateFormat}}</h4>
        <h3>You have reached the level of:</h3>
        <div *ngIf="auth.userProfile.user_metadata.score < 1000">
          <img class="avatar-img" src="/resources/img/knight-avatars/page.png" alt="page image"/>
          <h3 class="level">Page</h3>
        </div>
        <div *ngIf="auth.userProfile.user_metadata.score >= 1000 && auth.userProfile.user_metadata.score <= 2500">
          <img class="avatar-img" src="/resources/img/knight-avatars/squire.png" alt="page image"/>
          <h3 class="level">Squire</h3>
        </div>
        <div *ngIf="auth.userProfile.user_metadata.score > 2500 && auth.userProfile.user_metadata.score <= 3500 ">
          <img class="avatar-img" src="/resources/img/knight-avatars/princess.png" alt="page image"/>
          <h3 class="level">Princess</h3>
        </div>
        <div *ngIf="auth.userProfile.user_metadata.score > 3500 && auth.userProfile.user_metadata.score < 5000 ">
          <img class="avatar-img" src="/resources/img/knight-avatars/knight.png" alt="page image"/>
          <h3 class="level">Knight</h3>
        </div>
        <div *ngIf="auth.userProfile.user_metadata.score >= 5000 && auth.userProfile.user_metadata.score < 7500">
          <img class="avatar-img" src="/resources/img/knight-avatars/king.png" alt="page image"/>
          <h3 class="level">King</h3>
        </div>
        <div *ngIf="auth.userProfile.user_metadata.score > 7500 && auth.userProfile.user_metadata.score < 10000">
          <img class="avatar-img" src="/resources/img/knight-avatars/queen.png" alt="page image"/>
          <h3 class="level">Queen</h3>
        </div>
        <div *ngIf="auth.userProfile.user_metadata.score >= 10000">
          <img class="avatar-img" src="/resources/img/knight-avatars/wizard.png" alt="page image"/>
          <h3 class="level">Wizard</h3>
        </div>
      </div>
      <div class="col-md-6 user-quests">
        <h3 id="quest-list-title">Your quests:</h3>
        <div *ngFor="#quest_id of firebaseKeys" id="quest-list">

            <p (click)="goToQuest(quest_id)">{{responseFirebase[quest_id].activity}} in {{responseFirebase[quest_id].city}}</p>
        </div>
      </div>
    </div>
  </div>

  `
})

  // <div *ngIf="auth.userProfile.email === responseFirebase[quest_id].email">

export class ProfileComponent {
  responseFirebase: any;
  firebaseKeys: Array<string>;
  constructor(private auth: Auth, private _firebaseService: FirebaseService, private router: Router) {
    this._firebaseService.getAllQuests()
      .subscribe(
        data => {this.responseFirebase = data, this.firebaseKeys = Object.keys(data)},
        error => console.log(error)
      );
  }
  goToQuest(id) {
    this.router.navigate( ['Quest', { quest_id: id }] );
  }
}
