import { Component } from 'angular2/core';
import { FirebaseService } from './firebase.service';

@Component({
  template: `
    <div>
      <p *ngFor="#leader of firebaseKeys">{{leader}}: {{responseFirebase[leader]}}</p>
    </div>
  `
})
export class LeaderboardComponent {
  firebaseKeys: Array<string>;
  responseFirebase: any;
  constructor(private firebaseService: FirebaseService) {
    this.firebaseKeys = [];
    this.responseFirebase = {};
    this.firebaseService.getLeaderboard()
      .subscribe(
        leaderboard => {
          this.responseFirebase = leaderboard;
          this.firebaseKeys = Object.keys(leaderboard);
          this.firebaseKeys.sort(function(a,b) {
            if(leaderboard[a]<leaderboard[b]) {
              return 1;
            }
            if(leaderboard[a]>leaderboard[b]) {
              return -1;
            }
            return 0;
          });
          console.log(this.firebaseKeys);
        },
        error => console.log(error)
      )
  }
}
