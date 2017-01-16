import {Component, ViewEncapsulation} from "@angular/core";

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: "main-nav",
    template: require<any>("./main-nav.component.html"),
    styles: [
        require<any>("./main-nav.component.less")
    ],
    providers: []
})

export class MainNavComponent {};
