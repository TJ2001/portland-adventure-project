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
      <option value="food">food</option>
      <option value="drinks">drinks</option>
      <option value="coffee">coffee</option>
      <option value="shops">shops</option>
      <option value="sights">sights</option>
      <option value="outdoors">outdoors</option>
      <option value="arts">arts</option>
    </select>
      <div class="form-group row">
        <label for="example-text-input" class="col-xs-2 col-form-label">Zip Code: </label>
        <div class="col-xs-10">
        <input class="form-control" #zip>
        </div>
      </div>
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
      <button (click)="addInputs(city, state, country, activity, zip)" class="btn btn-danger btn-lg">Add</button>
    </div>
    <div *ngFor="#place of responseTrails.places">
      <div *ngFor="#activity of place.activities">
        <h4>{{activity.name}}</h4>
        <h5>{{activity.url}}</h5>
        <img src="{{activity.thumbnail}}" alt="picture of location">
      </div>
    </div>
    <div *ngFor="#venue of responseFourSquare.response.venues">
      <h4>{{venue.name}}</h4>
    </div>
    <div *ngFor="#day of responseWeather.query.results.channel.item.forecast">
      <h4>{{day.date}}</h4>
    </div>
    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
  </sebm-google-map>
  `
})


export class InputFormComponent {
  public responseTrails: any;
  public responseFourSquare: any;
  public responseWeather: any;
  public quest;
  lat: number;
  lng: number;
  zoom: number = 10
  constructor(private _firebaseService: FirebaseService,  private TrailService: TrailService, private WeatherService: WeatherService, private FoursquareService: FoursquareService, private GeocodeService: GeocodeService) {
    this.responseTrails = {places: []};
    this.responseFourSquare = {response: {venues: []}};
    this.responseWeather = {query: {results: { channel: { item:{ forecast: []}}}}};
  }

  addInputs(city: HTMLInputElement, state: HTMLInputElement, country: HTMLInputElement, activity: HTMLSelectElement, zip: HTMLInputElement) {
    var newQuest = new Quest(city.value, state.value, country.value, activity.value, zip.value);
    this.quest = newQuest;
    zip.value = "";
    city.value = "";
    state.value = "";
    country.value = "";
    this.WeatherService.getWeather(this.quest.city)
    .subscribe(
      data => this.responseWeather = data,
      error => console.log(error)
    );
    if(this.quest.activity==="hiking"||this.quest.activity==="camping"||this.quest.activity==="mountain biking") {
      this.TrailService.getTrail(this.quest.city, this.quest.state, this.quest.country, this.quest.activity)
      .subscribe(
        data => this.responseTrails = data,
        error => console.log(error)
      );
    } else {
    //if(this.quest.activity==="food"||this.quest.activity==="drinks"||this.quest.activity==="coffee"||this.quest.activity==="shops"||this.quest.activity==="arts"||this.quest.activity==="outdoors"||this.quest.activity==="sights") {
      this.FoursquareService.getFoursquare(this.quest.zip, this.quest.activity)
      .subscribe(
        data => this.responseFourSquare = data,
        error => console.log(error)
      );
    }
    this.GeocodeService.getGeocode()
    .subscribe(
      data => {console.log(data); this.lat =  data.results[0].geometry.location.lat; this.lng =  data.results[0].geometry.location.lng},
      error => console.log(error)
    );
  }
}




    //   );
    // }
