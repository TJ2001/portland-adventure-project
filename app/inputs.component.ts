import { Component } from 'angular2/core';
import {Quest} from './quest.model';
import { Auth } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import {TrailService} from './trail.service';
import {WeatherService} from './weather.service';
import {FoursquareService} from './foursquare.service';
import {GeocodeService} from './geocode.service';
import {FirebaseService} from './firebase.service';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES,ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

@Component({
  providers: [ Auth, FirebaseService , TrailService, WeatherService, FoursquareService, GeocodeService ],
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES ],

  selector: 'edit-quest-details',
  styleUrls: ['app/input.css'],
  template: `
  <div class="main-content">
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
      <div class="form-group row">
        <label for="example-text-input" class="col-xs-2 col-form-label">Date: </label>
        <div class="col-xs-10">
        <input type="date" class="form-control" #date>
        </div>
      </div>

      <button (click)="addInputs(city, state, country, activity, zip, date)" class="btn btn-danger btn-lg">Add</button>
    </div>
    <div *ngFor="#place of responseTrails.places">
      <div *ngFor="#activity of place.activities">
        <h4>{{activity.name}}</h4>
        <h5>{{activity.url}}</h5>
        <img src="{{activity.thumbnail}}" alt="picture of location">
      </div>
    </div>
    <div *ngIf="showmap">
      <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
      </sebm-google-map>
    </div>
  </div>

    <div *ngFor="#venue of responseFourSquare.response.venues">
      <h4>{{venue.name}}</h4>
    </div>
    <div *ngFor="#day of responseWeather.query.results.channel.item.forecast">
      <h4>{{day.date}}</h4>
    </div>
  `
})


export class InputFormComponent {

  public showmap = false;
  public responseTrails: any;
  public responseFourSquare: any;
  public responseWeather: any;
  public quest;
  lat: number;
  lng: number;
  zoom: number = 10
  constructor(private auth: Auth, private authHttp: AuthHttp, private _firebaseService: FirebaseService,  private TrailService: TrailService, private WeatherService: WeatherService, private FoursquareService: FoursquareService, private GeocodeService: GeocodeService) {
    this.responseTrails = {places: []};
    this.responseFourSquare = {response: {venues: []}};
    this.responseWeather = {query: {results: { channel: { item:{ forecast: []}}}}};
  }

  addInputs(city: HTMLInputElement, state: HTMLInputElement, country: HTMLInputElement, activity: HTMLSelectElement, zip: HTMLInputElement, date: HTMLInputElement) {

    var newScore = this.auth.userProfile.user_metadata.score + 10;
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var data: any = JSON.stringify({
      user_metadata: {
        score: newScore
      }
    });


    this.authHttp
      .patch('https://' + 'callanmcnulty.auth0.com' + '/api/v2/users/' + this.auth.userProfile.user_id, data, {headers: headers})
      .subscribe(
        response => {
          //Update profile
          var storage = JSON.parse(localStorage.getItem('profile'));
          storage.user_metadata.score = newScore;
          this.auth.userProfile.user_metadata.score = newScore;
        },
        error => alert(error.json().message)
      );

    var newQuest = new Quest(city.value, state.value, country.value, activity.value, zip.value, moment(date.value).format("DD MMM YYYY"));
    this.quest = newQuest;
    this._firebaseService.setQuest(newQuest)
      .subscribe(
        quest => console.log(quest),
        error => console.log(error)
      );
    zip.value = "";
    city.value = "";
    state.value = "";
    country.value = "";
    date.value = "";


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
      this.FoursquareService.getFoursquare(this.quest.zip, this.quest.activity)

      .subscribe(
        data => this.responseFourSquare = data,
        error => console.log(error)
      );
      this.showmap = true;
    }
    this.GeocodeService.getGeocode(this.quest.zip)
    .subscribe(
      data => {console.log(data); this.lat =  data.results[0].geometry.location.lat; this.lng =  data.results[0].geometry.location.lng},
      error => console.log(error)
    );
  }
}
