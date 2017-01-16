import {Component, ViewEncapsulation} from "@angular/core";

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: "main-nav",
    template: require<any>("./main-nav.component.html"),
    providers: []
})

export class MainNavComponent {};
