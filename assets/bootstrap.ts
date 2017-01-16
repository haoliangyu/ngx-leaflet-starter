import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule} from "@angular/core";
import {FormsModule}   from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from './components/app/app.component';
import {MainNavComponent} from './components/main-nav/main-nav.component';
import {MainFooterComponent} from './components/main-footer/main-footer.component';

@NgModule({
    imports: [FormsModule, BrowserModule],
    bootstrap: [AppComponent],
    declarations: [ MainNavComponent, MainFooterComponent, AppComponent ]
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
