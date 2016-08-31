import { Injectable} from 'angular2/core';
import { Quest } from './quest.model';

@Injectable()
export class CurrentQuestService {
  private static _quest: Quest;
  static setQuest(quest) {
    this._quest = quest;
  }
  static getQuest() {
    if(this._quest===undefined) {
      return {city: ""};
    }
    return this._quest;
  }
}
