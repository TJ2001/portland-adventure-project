
import { Injectable} from 'angular2/core';
import{ Http, Headers, RequestOptions, URLSearchParams } from 'angular2/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

	constructor(private http: Http) {}

	getWeather(city) {
    return this.http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+city+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
      .map(response => response.json());
    }
  }
