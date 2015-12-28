import {Component, View} from 'angular2/core';
// import {GeocodingService} from '../../services/geocoding.service';
// import {Location} from '../../core/location.class';

@Component({
    selector: 'navigator'
})
@View({
    templateUrl: './components/navigator/navigator.component.html',
    styleUrls: [
        './components/navigator/navigator.component.css',
        './styles/main.css'
    ]
})
export class NavigatorComponent {
    // constructor(private _geocoder: GeocodingService) {}
}
