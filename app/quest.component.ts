import { Component } from 'angular2/core';
import { Quest } from './quest.model';
import {FirebaseService} from './firebase.service';
import { RouteParams } from 'angular2/router';

@Component({
  template: `
    <h1>{{quest.activity}} in {{quest.city}}, {{quest.state}} {{quest.country}}</h1>
  `
})

export class QuestComponent {
  quest: any;
  constructor(private routeParams: RouteParams, private firebaseService: FirebaseService) {
    this.quest = {actvity:"",city:"",state:"",country:"",zip:""};
    firebaseService.getQuest(this.routeParams.get('quest_id'))
      .subscribe(
        data => this.quest = data,
        error => console.log(error)
      )
  }
}
