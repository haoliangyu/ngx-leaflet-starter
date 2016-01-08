/// <reference path="../../../typings/leaflet/leaflet.d.ts"/>

import {Component, View} from 'angular2/core';
import {GeocodingService} from '../../services/geocoding.service';
import {MapService} from '../../services/map.service';
import {Location} from '../../core/location.class';
import {Map} from 'leaflet';

@Component({
    selector: 'navigator'
})
@View({
    template: require('./navigator.component.html'),
    styles: [
        require('./navigator.component.less'),
        require('../../styles/main.less')
    ]
})
export class NavigatorComponent {
    address: string;
    geocoder: GeocodingService;
    map: Map;

    constructor(geocoder: GeocodingService, mapService: MapService) {
        this.address = '';
        this.geocoder = geocoder;
        this.map = mapService.map;
    }

    goto() {
        if (!this.address) { return;}

        this.geocoder.geocode(this.address)
        .subscribe(location => {
            this.map.panTo([location.latitude, location.longitude]);
            this.address = location.address;
        }, error => {
            console.error(error);
        });
    }
}
