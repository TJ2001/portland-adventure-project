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
import { Router} from 'angular2/router';
declare var moment: any;

@Component({
  providers: [ Auth, FirebaseService , TrailService, WeatherService, FoursquareService, GeocodeService ],
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES ],

  selector: 'edit-quest-details',
  styleUrls: ['app/input.css'],
  template: `
  <link href="https://fonts.googleapis.com/css?family=Baloo+Bhaina" rel="stylesheet">

  <div class = "margin-top">
  </div>
  <div class="input-content parallax">
    <div class="container">
      <div class="oracle">
        <select class="form-control narrow selectpicker" name="activity-select" data-style="btn-primary" #activity>
          <option value="" disabled selected>Select Your Activity</option>
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
        <div class="margin-top">
        <div class="form-group row negative-margin">
          <label for="example-text-input" class="col-xs-2 col-form-label">Zip: </label>
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
      </div>
    </div>
    <button (click)="addInputs(city, state, country, activity, zip, date)" class=" btn-lg circle btn-danger">Create Quest</button>
  </div>
  `
})


export class InputFormComponent {

  public quest;
  constructor(private auth: Auth, private _firebaseService: FirebaseService, private authHttp: AuthHttp,  private TrailService: TrailService, private WeatherService: WeatherService, private FoursquareService: FoursquareService, private GeocodeService: GeocodeService, private router: Router) {}

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

    var newQuest = new Quest(city.value, state.value, country.value, activity.value, zip.value, moment(date.value).format("DD MMM YYYY"), this.auth.userProfile.email );//
    this.quest = newQuest;
    this._firebaseService.setQuest(newQuest)
      .subscribe(
        response => {this.router.navigate( ['Quest', { quest_id: response.json().name }] );},
        error => console.log(error)
      );
    zip.value = "";
    city.value = "";
    state.value = "";
    country.value = "";
    date.value = "";
  }
}
