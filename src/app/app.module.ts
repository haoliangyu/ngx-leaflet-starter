import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { MatToolbarModule } from "@angular/material/toolbar";

import { AppComponent } from "./app.component";
import { NavigatorComponent } from "./navigator/navigator.component";
import { MapComponent } from "./map/map.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

import { MapService } from "./map.service";
import { GeocodingService } from "./geocoding.service";

@NgModule({
  declarations: [
    NavigatorComponent,
    MapComponent,
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule
  ],
  providers: [MapService, GeocodingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
