import { Component, EventEmitter } from 'angular2/core';
import { Quest } from './quest.model';
import {FirebaseService} from './firebase.service';

@Component({
  selector: 'quest-generator',
  template: `
  `
})

export class questComponent {
  public quests: Quest [];
  constructor(){
    this.quests = [
      new Quest("Destiny", "Adventure", "Amusement Park", 97006),
      new Quest("Scary Night", "Adventure", "Dive Bar", 97777),
      new Quest("Fetch", "Fetch", "Grocery", 97890)
    ];
  }

}
