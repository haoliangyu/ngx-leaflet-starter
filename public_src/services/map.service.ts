/// <reference path="../../typings/leaflet/leaflet.d.ts"/>

import {Injectable} from 'angular2/core';
import {Location} from '../core/location.class';
import {Map} from 'leaflet';

@Injectable()
export class MapService {
    map: Map;

    disableMouseEvent(tag: string) {
        var html = L.DomUtil.get(tag);

        L.DomEvent.disableClickPropagation(html);
        L.DomEvent.on(html, 'mousewheel', L.DomEvent.stopPropagation);
    };
}
