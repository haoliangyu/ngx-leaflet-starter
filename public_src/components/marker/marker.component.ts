/// <reference path="../../../typings/leaflet/leaflet.d.ts"/>
/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/core';
import {CORE_DIRECTIVES, NgClass} from 'angular2/common';
import {MapService} from '../../services/map.service';
import {Map, LeafletMouseEvent, Marker} from 'leaflet';
import {ButtonCheckbox} from '../../../node_modules/ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'marker'
})
@View({
    template: require('./marker.component.html'),
    styles: [
        require('./marker.component.less'),
        require('../../styles/main.less')
    ],
    directives: [CORE_DIRECTIVES, ButtonCheckbox]
})
export class MarkerComponent {
    map: Map;
    markers: Marker[];
    editing: boolean;
    removing: boolean;

    constructor(mapService: MapService) {
        this.map = mapService.map;
        this.editing = false;
        this.removing = false;
        this.markers = [];

        this.map.on('click', (e: LeafletMouseEvent) => {
            if (this.editing) {
                let marker = L.marker(e.latlng, {
                    icon: L.icon({
                        iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
                        shadowUrl: require('../../../node_modules/leaflet/dist/images/marker-shadow.png')
                    }),
                    draggable: true
                }).addTo(this.map);
                this.markers.push(marker);
            }

            if (this.removing && this.markers.length > 0) {
                let between = Number.MAX_VALUE;
                let toDelete;
                for (let marker of this.markers) {
                    let distance = e.latlng.distanceTo(marker.getLatLng());
                    if (distance < between) {
                        between = distance;
                        toDelete = marker;
                    }
                }

                if (toDelete) {
                    this.map.removeLayer(toDelete);
                }
            }
        });
    }

    toggleEditing() {
        this.editing = !this.editing;

        if (this.editing == true && this.removing == true) {
            this.removing = false;
        }
    }

    toggleRemoving() {
        this.removing = !this.removing;

        if (this.editing == true && this.removing == true) {
            this.editing = false;
        }
    }
}
