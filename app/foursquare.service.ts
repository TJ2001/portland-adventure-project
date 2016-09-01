
import { Injectable} from 'angular2/core';
import{ Http, Headers, RequestOptions, URLSearchParams } from 'angular2/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FoursquareService {

	constructor(private http: Http) {}

	getFoursquare(zip, activity) {
		var headers = new Headers();
		headers.append("X-Mashape-Key","KnXEBxjwxVmsh2RwuCjMpCrEffF2p1F7PLmjsnJxiiOAtyeSlf");
		headers.append("Accept","text/plain");
		var options = new RequestOptions({
			search: new URLSearchParams("near="+zip+"&section="+activity+"&client_id=AHT1VTGLT0FOCHG2UTAXQE2GX4ZDR1VU1W0X2EWGY5CRZLAN&client_secret=AOC1LDHKLETPD4JCWVBPJDCDRS3QHBWLZLOPZ3OPII3WEPL4&v=20140806&m=foursquare")
		});
    return this.http.get("https://api.foursquare.com/v2/venues/search", options)
      .map(response => response.json());
    }
  }
