import { Component } from 'angular2/core';
import { Auth } from './auth.service';

@Component({
  template:`
    <h2> SOmething Atleast </h2>
    <div class="container">
      <div class="col-md-6">
        <h4>{{auth.userProfile.user_metadata.score}}</h4>
      </div>
      <div class="col-md-6">

      </div>
    </div>
  `
})

export class ProfileComponent {
  constructor(private auth: Auth) {}
}
