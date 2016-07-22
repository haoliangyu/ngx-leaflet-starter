import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './components/app/app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {MapService} from './services/map.service';
import {GeocodingService} from './services/geocoding.service';

bootstrap(AppComponent, [HTTP_PROVIDERS, MapService, GeocodingService])
.catch(err => console.error(err));
