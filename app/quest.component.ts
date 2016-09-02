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
  <link href="https://fonts.googleapis.com/css?family=Baloo+Bhaina" rel="stylesheet">

  <div class="quest-content">
    <div class="post-container">
      <div class="map" *ngIf="showmap">
        <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
          <sebm-google-map-marker *ngFor="#venue of responseFourSquare.response.venues" [latitude]="venue.location.lat" [longitude]="venue.location.lng" [label]="'F'">
          </sebm-google-map-marker>
          <sebm-google-map-marker *ngFor="#place of responseTrails.places" [latitude]="place.lat" [longitude]="place.lng" [label]="'T'">
          </sebm-google-map-marker>
        </sebm-google-map>
      </div>
      <div class="display-weather col-sm-3">
        <div *ngFor="#day of responseWeather.query.results.channel.item.forecast">
          <div *ngIf="day.date === quest.date">
            <h4>Weather for {{day.date}}:<br> High: {{day.high}} Low: {{day.low}} Forecast: {{day.text}}</h4>
          </div>
        </div>
      </div>
      <div class="post-content">
        <h1 class="post-title">{{quest.activity}} in {{quest.city}}, {{quest.state}} {{quest.country}}</h1>
        <div class="questoutput">
          <div class="margin-top">
<!--- trail-API -->
            <div *ngIf="responseTrails.places.length > 0" class="display-trail">
              <div *ngFor="#place of responseTrails.places">
                <div *ngFor="#activity of place.activities">
                  <h4>{{activity.name}}</h4>
                  <h5>{{activity.url}}</h5>
                  <img src="{{activity.thumbnail}}" alt="picture of location">
                </div>
              </div>
            </div>
          </div>
<!--- trail-API end -->
          <div class="negative-top">
            <div *ngIf="responseFourSquare.response.venues.length > 0" class="display-Four col-sm-4">
              <div *ngFor="#venue of responseFourSquare.response.venues">
                <h3>{{venue.name}}</h3>
                <h4 class="color-change">{{venue.location.address}}</h4>
                <hr>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <h4 class="font-color">Powered by </h4>
  <img src="https://s3.amazonaws.com/mashape-production-logos/apis/53aa3bcfe4b0a705fcc30dc5_medium" alt="TrailAPI" class="profile-pic logo">
  <img src="https://ss0.4sqi.net/img/poweredByFoursquare/poweredby-one-color-cdf070cc7ae72b3f482cf2d075a74c8c.png" style="width:220px;padding-top: 7px;" class="footerLogo">
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
  zoom: number = 12
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

// <sebm-google-map-marker *ngFor="#venue of responseFourSquare.response.venues" [latitude]="venue.location.lat" [longitude]="venue.location.lng" [label]="'M'">
// </sebm-google-map-marker>
