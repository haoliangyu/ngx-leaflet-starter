import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule} from "@angular/core";
import {FormsModule}   from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {MainNavComponent} from './components/main-nav/main-nav.component';

@NgModule({
    imports: [FormsModule, BrowserModule],
    bootstrap: [MainNavComponent],
    declarations: [ MainNavComponent ]
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
