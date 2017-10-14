import {Component} from "@angular/core";
import {MapService} from "../../services/map.service";
import * as L from "leaflet";

@Component({
    selector: "toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: [
        "./toolbar.component.less",
        "../../styles/main.less"
    ],
    providers: []
})
export class ToolbarComponent {
    editing: boolean;
    removing: boolean;
    airportLayerAdded: boolean;
    markerCount: number;

    constructor(private mapService: MapService) {
        this.editing = false;
        this.removing = false;
        this.markerCount = 0;
    }

    ngOnInit() {
        this.mapService.disableMouseEvent("add-marker");
        this.mapService.disableMouseEvent("remove-marker");
        this.mapService.disableMouseEvent("toggle-layer");
    }

    Initialize() {
        this.mapService.map.on("click", (e: L.LeafletMouseEvent) => {
            if (this.editing) {
                let marker = L.marker(e.latlng, {
                    icon: L.icon({
                        iconUrl: require<any>("../../../node_modules/leaflet/dist/images/marker-icon.png"),
                        shadowUrl: require<any>("../../../node_modules/leaflet/dist/images/marker-shadow.png")
                    }),
                    draggable: true
                })
                .bindPopup("Marker #" + (this.markerCount + 1).toString(), {
                    offset: L.point(12, 6)
                })
                .addTo(this.mapService.map)
                .openPopup();

                this.markerCount += 1;

                marker.on("click", (event: MouseEvent) => {
                    if (this.removing) {
                        this.mapService.map.removeLayer(marker);
                        this.markerCount -= 1;
                    }
                });
            }
        });
    }

    toggleEditing() {
        this.editing = !this.editing;

        if (this.editing && this.removing) {
            this.removing = false;
        }
    }

    toggleRemoving() {
        this.removing = !this.removing;

        if (this.editing && this.removing) {
            this.editing = false;
        }
    }

    toggleAirPortLayer() {
        this.airportLayerAdded = !this.airportLayerAdded;
        this.mapService.toggleAirPortLayer();
    }
}
