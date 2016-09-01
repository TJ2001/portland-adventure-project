import { Component } from 'angular2/core';
import {Quest} from './quest.model';
import {TrailService} from './trail.service';
import {WeatherService} from './weather.service';
import {FoursquareService} from './foursquare.service';
import {GeocodeService} from './geocode.service';
import {FirebaseService} from './firebase.service';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES,ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

@Component({
  providers: [ FirebaseService , TrailService, WeatherService, FoursquareService, GeocodeService ],
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES ],

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
    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
  </sebm-google-map>
  `
})


export class InputFormComponent {
  public response: any;
  public quest;
  lat: number;
  lng: number;
  zoom: number = 10
  constructor(private _firebaseService: FirebaseService,  private TrailService: TrailService, private WeatherService: WeatherService, private FoursquareService: FoursquareService, private GeocodeService: GeocodeService) {
    this.response = {places: []};
  }

  addInputs(city: HTMLInputElement, state: HTMLInputElement, country: HTMLInputElement, activity: HTMLSelectElement) {
    var newQuest = new Quest(city.value, state.value, country.value, activity.value);
    this.quest = newQuest;
    city.value = "";
    state.value = "";
    country.value = "";
    this.TrailService.getTrail(this.quest.city, this.quest.state, this.quest.country, this.quest.activity)
    .subscribe(
      data => this.response = data,
      error => console.log(error)
    );
      this.WeatherService.getWeather()
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      this.FoursquareService.getFoursquare()
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      this.GeocodeService.getGeocode()
      .subscribe(
        data => {console.log(data); this.lat =  data.results[0].geometry.location.lat; this.lng =  data.results[0].geometry.location.lng},
        error => console.log(error)
      );
    }
}




    //   );
    // }
