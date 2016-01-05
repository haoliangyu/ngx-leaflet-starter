/// <reference path="../../../typings/leaflet/leaflet.d.ts"/>

import {Component, View} from 'angular2/core';
import {NavigatorComponent} from '../navigator/navigator.component';

@Component({
    selector: 'app'
})
@View({
    template: require('./app.component.html'),
    styles: [
        require('./app.component.less')
    ],
    directives: [NavigatorComponent]
})
export class AppComponent {
    constructor() {
        var map = new L.Map('map', {
            zoomControl: false,
            center: new L.LatLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19
        });
        var baseMap = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
        }).addTo(map);
        var zoomControl = L.control.zoom({
            position: 'topright'
        }).addTo(map);
    }

}
