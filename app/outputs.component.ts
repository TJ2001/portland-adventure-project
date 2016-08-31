import { Component } from 'angular2/core';
import {Quest} from './quest.model';
import { TrailService } from './trail.service';
import { CurrentQuestService } from './current-quest.service';

@Component({
  providers: [ TrailService, CurrentQuestService ],
  selector: 'show-quest-details',
  template: `
    <p>{{CurrentQuestService.getQuest().city}}</p>
  `
})
export class OutputComponent {
}
