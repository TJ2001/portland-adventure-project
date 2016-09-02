import { Injectable } from 'angular2/core' ;
import { Http } from 'angular2/http' ;
import { last } from 'rxjs/operator/last' ;
import 'rxjs/Rx';

import { Quest }  from './quest.model' ;


@Injectable()
export class FirebaseService {

  constructor(private http: Http) {}

  setQuest(quest: Quest) {
    const body = JSON.stringify(quest);
    return this.http.post('https://portland-adventure.firebaseio.com/quest.json', body);
  }
  getQuest(quest_id: string) {
    return this.http.get('https://portland-adventure.firebaseio.com/quest/'+quest_id+'.json')
      .map(response => response.json());
  }
  getAllQuests() {
    return this.http.get('https://portland-adventure.firebaseio.com/quest/.json')
      .map(response => response.json());
  }
  getLeaderboard() {
    return this.http.get('https://portland-adventure.firebaseio.com/leaderboard/.json')
      .map(response => response.json());
  }
  setLeaderboard(leaders: Object) {
    const body = JSON.stringify(leaders);
    console.log(leaders);
    return this.http.put('https://portland-adventure.firebaseio.com/leaderboard.json', body);
  }
}
