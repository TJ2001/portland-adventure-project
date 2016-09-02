import { Component } from 'angular2/core';
import { Auth } from './auth.service';
import { FirebaseService } from './firebase.service';

@Component({
  styleUrls: ['app/profile.css'],
  providers: [ Auth, FirebaseService ],
  template:`
  <div class="main-content">
    <h2>{{auth.userProfile.nickname}}'s Profile</h2>
    <div class="container">
      <div class="col-md-6">
        <h3>Your Score: {{auth.userProfile.user_metadata.score}}</h3>
        <h3>You have been a member since:</h3>
        <h4 id="date">{{auth.userProfile.created_at}}</h4>

      </div>
      <div class="col-md-6">
        <h3>hello</h3>
      </div>
    </div>
    <div *ngFor="#quest_id of firebaseKeys">

        <p (click)="goToQuest(quest_id)">{{responseFirebase[quest_id].activity}} in {{responseFirebase[quest_id].city}}</p>
      </div>

  </div>

  `
})

  // <div *ngIf="auth.userProfile.email === responseFirebase[quest_id].email">

export class ProfileComponent {
  responseFirebase: any;
  firebaseKeys: Array<string>;
  constructor(private auth: Auth, private _firebaseService: FirebaseService) {
    this._firebaseService.getAllQuests()
      .subscribe(
        data => {this.responseFirebase = data, this.firebaseKeys = Object.keys(data)},
        error => console.log(error)
      );
  }
}
