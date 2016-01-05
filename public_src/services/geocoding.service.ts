import {Http, Headers} from 'angular2/http';
import {Location} from '../core/location.class';
import {Injectable} from 'angular2/core';

@Injectable()
export class GeocodingService {

    constructor(public http: Http) { }

    geocode(address: string):Location {
        this.http
        .get('maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address))
        .map(res => res.json())
        .subscribe(
            result => {
                if(result.status != 'OK') { return undefined; }

                var location = new Location();
                location.address = result.formatted_address;
                location.latitude = result.geometry.location.lat;
                location.longitude = result.geometry.location.long;

                return location;
            },
            err => { console.error(err); }
        );

        return undefined;
    }

}
