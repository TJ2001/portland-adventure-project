
import { Injectable} from 'angular2/core';
import{ Http, Headers, RequestOptions } from 'angular2/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TrailService {

	constructor(private http: Http) {}

	getTrail(city, state, country, activity) {
		city = city.replace(" ", "+");
		state = state.replace(" ", "+");
		country = country.replace(" ", "+");
    activity = activity.replace(" ", "+");
		var headers = new Headers();
		headers.append("X-Mashape-Key","CsNuYRIWnKmsha2A8Sj7FcSKBGgvp1eMa2Yjsn3srnozO5OxLQ");
		headers.append("Accept","text/plain");
		var options = new RequestOptions({headers: headers});
    return this.http.get("https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=" + activity + "&q[city_cont]=" + city + "&q[country_cont]=" + country + "&q[state_cont]=" + state, options)
      .map(response => response.json());
    }
  }
