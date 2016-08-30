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
    console.log(quest);
    return this.http.post('https://portland-adventure.firebaseio.com/quest.json', body);
  }

  getQuest() {
    return this.http.get('https://portland-adventure.firebaseio.com/quest.json')
      .map(response => response.json());
  }
}
