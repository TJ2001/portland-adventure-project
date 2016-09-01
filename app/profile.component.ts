import { Component } from 'angular2/core';
import { Auth } from './auth.service';

@Component({
  styleUrls: ['app/profile.css'],
  template:`
  <div class="main-content">
    <h2>{{auth.userProfile.nickname}}'s Profile</h2>
    <div class="container">
      <div class="col-md-6">
        <h3>Your Score: {{auth.userProfile.user_metadata.score}}</h3>
        <h4>Your Level:
    
        </h4>
      </div>
      <div class="col-md-6">
        <h3>hello</h3>
      </div>
    </div>
  </div>
  `
})

export class ProfileComponent {
  constructor(private auth: Auth) {}
}
