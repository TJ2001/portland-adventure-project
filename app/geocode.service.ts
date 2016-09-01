
import { Injectable} from 'angular2/core';
import{ Http, Headers, RequestOptions, URLSearchParams } from 'angular2/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GeocodeService {

	constructor(private http: Http) {}

	getGeocode(zip) {
    var options = new RequestOptions({
      search: new URLSearchParams("address=" + zip + "&key=AIzaSyAO_tz42tA_D6kG-K3vtGAl4Q_H0s2aYvk")
    });
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json", options)
      .map(response => response.json());
    }
  }
