
import { Injectable} from 'angular2/core';
import{ Http, Headers, RequestOptions } from 'angular2/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TrailService {

	constructor(private http: Http) {}

	getTrail() {
		var headers = new Headers();
		headers.append("X-Mashape-Key","KnXEBxjwxVmsh2RwuCjMpCrEffF2p1F7PLmjsnJxiiOAtyeSlf");
		headers.append("Accept","text/plain");
		var options = new RequestOptions({headers: headers});
    return this.http.get("https://trailapi-trailapi.p.mashape.com/?lat=34.1&limit=25&lon=-105.2&radius=50", options)
      .map(response => response.json());
    }
  }
