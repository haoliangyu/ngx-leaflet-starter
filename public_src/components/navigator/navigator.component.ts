import {Component, View} from 'angular2/core';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';

@Component({
    selector: 'navigator',
    providers: [GeocodingService]
})
@View({
    template: require('./navigator.component.html'),
    styles: [
        require('./navigator.component.less'),
        require('../../styles/main.less')
    ]
})
export class NavigatorComponent {
    constructor(private geocoder: GeocodingService) {}
}
