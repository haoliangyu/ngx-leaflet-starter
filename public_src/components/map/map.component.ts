/// <reference path="../../../typings/leaflet/leaflet.d.ts"/>

import {Component} from 'angular2/core';

@Component({
    selector: 'map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.css']
})
export class MapComponent {

}

var map = new L.Map('map').setView(new L.LatLng(40.731253, -73.996139), 12);
var layer = new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
}).addTo(map);
