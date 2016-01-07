/// <reference path="../../../typings/leaflet/leaflet.d.ts"/>

import {Component, View} from 'angular2/core';
import {GeocodingService} from '../../services/geocoding.service';
import {MapService} from '../../services/map.service';
import {Location} from '../../core/location.class';

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
    mapService: MapService;

    constructor(geocoder: GeocodingService, mapService: MapService) {
        this.address = '';
        this.geocoder = geocoder;
        this.mapService = mapService;
    }

    goto() {
        if (!this.address) { return;}

        let map = this.mapService;
        let showErrorMessage = this.showErrorMessage;

        this.geocoder.geocode(this.address)
        .subscribe(function(location) {
            map.panTo(location);
        }, function(err) {
            showErrorMessage();
            console.error(err);
        });
    }

    showErrorMessage() {

    }
}
