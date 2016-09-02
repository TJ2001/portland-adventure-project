import { Component } from 'angular2/core';
import { FirebaseService } from './firebase.service';

@Component({
  styleUrls: ['app/leaderboard.css'],
  template: `
    <div class="main-content">
      <h2>High Scores:</h2>
      <div id="board">
        <p *ngFor="#leader of firebaseKeys">{{leader}}: {{responseFirebase[leader]}}</p>
      </div>
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
