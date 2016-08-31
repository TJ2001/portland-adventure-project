import { Component } from 'angular2/core';
import {Quest} from './quest.model';
import { CurrentQuestService } from './current-quest.service';
import {TrailService} from './trail.service';


@Component({
  providers: [TrailService],
  selector: 'edit-quest-details',
  template: `
    <div class="margin-top">
    <select class="form-control" name="activity-select" #activity>
      <option value="hiking">hiking</option>
      <option value="mountain biking">mountain biking</option>
      <option value="camping">camping</option>
    </select>
      <div class="form-group row">
        <label for="example-text-input" class="col-xs-2 col-form-label">City: </label>
        <div class="col-xs-10">
        <input class="form-control" #city>
        </div>
      </div>
      <div class="form-group row">
        <label for="example-text-input" class="col-xs-2 col-form-label">State: </label>
        <div class="col-xs-10">
        <input class="form-control" #state>
        </div>
      </div>
      <div class="form-group row">
        <label for="example-text-input" class="col-xs-2 col-form-label">Country: </label>
        <div class="col-xs-10">
        <input class="form-control" #country>
        </div>
      </div>
      <button (click)="addInputs(city, state, country, activity)" class="btn btn-danger btn-lg">Add</button>
    </div>
    <div *ngFor="#place of response.places">
      <div *ngFor="#activity of place.activities">
        <h4>{{activity.name}}</h4>
        <h5>{{activity.url}}</h5>
        <img src="{{activity.thumbnail}}" alt="picture of location">
      </div>
    </div>
  `
})


export class InputFormComponent {
  public response: any;
  public quest;
  constructor(private _currentQuest: CurrentQuestService, private TrailService: TrailService) {
    this.response = {places: []};
  }

  addInputs(city: HTMLInputElement, state: HTMLInputElement, country: HTMLInputElement, activity: HTMLSelectElement) {
    var newQuest = new Quest(city.value, state.value, country.value, activity.value);
    this.quest = newQuest;
    CurrentQuestService.setQuest(newQuest);
    city.value = "";
    state.value = "";
    country.value = "";
    console.log(CurrentQuestService.getQuest());
    this.TrailService.getTrail(this.quest.city, this.quest.state, this.quest.country, this.quest.activity)
    .subscribe(
      data => this.response = data,
      error => console.log(error)
    );
  }
}
