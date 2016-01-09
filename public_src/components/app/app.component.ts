/// <reference path="../../../typings/leaflet/leaflet.d.ts"/>

import {Component, View} from 'angular2/core';
import {NavigatorComponent} from '../navigator/navigator.component';
import {MarkerComponent} from '../marker/marker.component';
import {MapService} from '../../services/map.service';

@Component({
    selector: 'app'
})
@View({
    template: require('./app.component.html'),
    styles: [
        require('./app.component.less')
    ],
    directives: [NavigatorComponent, MarkerComponent]
})
export class AppComponent {
    constructor(mapService: MapService) {
        var map = new L.Map('map', {
            zoomControl: false,
            center: new L.LatLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19,
            layers: [mapService.baseMaps.OpenStreetMap]
        });

        L.control.zoom({ position: 'topright' }).addTo(map);
        L.control.layers(mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        mapService.map = map;
    }

}
