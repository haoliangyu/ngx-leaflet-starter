import {Http, Headers} from 'angular2/http';
import {Location} from '../core/location.class';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map'

@Injectable()
export class GeocodingService {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    geocode(address: string) {
        return this.http
        .get('http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address))
        .map(res => res.json())
        .map(result => {
            if(result.status != 'OK') { throw new Error('unable to geocode address'); }

            var location = new Location();
            location.address = result.results[0].formatted_address;
            location.latitude = result.results[0].geometry.location.lat;
            location.longitude = result.results[0].geometry.location.lng;

            return location;
        });
    }

}
