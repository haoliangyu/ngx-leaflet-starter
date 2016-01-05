/// <reference path="../../typings/leaflet/leaflet.d.ts"/>

import {Injectable} from 'angular2/core';
import {Map} from 'leaflet';

@Injectable()
export class MapService {
    map: Map;
}
