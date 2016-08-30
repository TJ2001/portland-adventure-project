import { Component } from 'angular2/core';
import { Auth } from './auth.service';

@Component({
  template: `
    <div class = "container">
      <h1>About</h1>
      <p>Sample Routed Component</p>
    </div>
    `,
  providers: [ Auth ]
})
export class AboutComponent {
  constructor(private auth: Auth) {}
}
