import { Component } from 'angular2/core';
import { Auth } from './auth.service';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'my-app',
  template: `
    <div class = "container">
      <h1>Skeleton Angular2 App!</h1>
      <button (click)="auth.login()">Login</button>
      <button (click)="auth.logout()">Logout</button>
      <div *ngIf="auth.authenticated()">
        <p>Logged In</p>
        <p>{{auth.userProfile.email}}</p>
      </div>
    </div>
    `,
  providers: [ Auth ],
  directives: [ ROUTER_DIRECTIVES ]
})

export class AppComponent {
  constructor(private auth: Auth) {}
  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
}
