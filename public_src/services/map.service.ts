/// <reference path="../../typings/leaflet/leaflet.d.ts"/>

import {Injectable} from 'angular2/core';
import {Location} from '../core/location.class';
import {Map} from 'leaflet';

@Injectable()
export class MapService {
    map: Map;

    panTo(location: Location) {
        if (!this.map) { return; }

        this.map.panTo([location.latitude, location.longitude]);
    }
}
