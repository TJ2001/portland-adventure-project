import { Component } from 'angular2/core';
import { Quest } from './quest.model';
import { RouteParams } from 'angular2/router';
import {TrailService} from './trail.service';
import {WeatherService} from './weather.service';
import {FoursquareService} from './foursquare.service';
import {GeocodeService} from './geocode.service';
import {FirebaseService} from './firebase.service';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES,ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

@Component({
  providers: [ FirebaseService , TrailService, WeatherService, FoursquareService, GeocodeService ],
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES ],
  styleUrls: ['app/quest.css'],
  template: `
  <div class="main-content">
    <div class="margin-top">
      <h1>{{quest.activity}} in {{quest.city}}, {{quest.state}} {{quest.country}}</h1>
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
      <div *ngIf="day.date === quest.date">
        <h4>Weather for {{day.date}} goes here</h4>
      </div>
    </div>
  </div>
  `
})

export class QuestComponent {
  public showmap = false;
  public responseTrails: any;
  public responseFourSquare: any;
  public responseWeather: any;
  quest: any;
  lat: number;
  lng: number;
  zoom: number = 10
  constructor(private routeParams: RouteParams, private firebaseService: FirebaseService, private TrailService: TrailService, private WeatherService: WeatherService, private FoursquareService: FoursquareService, private GeocodeService: GeocodeService ) {
    this.responseTrails = {places: []};
    this.responseFourSquare = {response: {venues: []}};
    this.responseWeather = {query: {results: { channel: { item:{ forecast: []}}}}};
    this.quest = {actvity:"",city:"",state:"",country:"",zip:""};
    firebaseService.getQuest(this.routeParams.get('quest_id'))
      .subscribe(
        data => {this.quest = data;
          this.WeatherService.getWeather(this.quest.city)
        .subscribe(
          data => {console.log(this.quest.date); console.log(data); this.responseWeather = data},
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
        ); },
        error => console.log(error)
      )

  }


}
