import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Location } from "./location";
import * as L from "leaflet";

@Injectable()
export class MapService {
  public map: L.Map;
  public baseMaps: any;
  private vtLayer: any;

  constructor(private http: HttpClient) {
    this.baseMaps = {
      OpenStreetMap: L.tileLayer(
        "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        {
          attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>`
        }
      ),
      Esri: L.tileLayer(
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: `Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community`
        }
      ),
      CartoDB: L.tileLayer(
        "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        {
          attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>`
        }
      )
    };
  }

  disableMouseEvent(elementId: string) {
    const element = <HTMLElement>document.getElementById(elementId);

    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }

  toggleAirPortLayer() {
    if (this.vtLayer) {
      this.map.removeLayer(this.vtLayer);
      delete this.vtLayer;
    } else {
      this.http.get("assets/airports.min.geojson").subscribe(result => {
        this.vtLayer = L.vectorGrid.slicer(result);
        this.vtLayer.addTo(this.map);
      });
    }
  }

  fitBounds(bounds: L.LatLngBounds) {
    this.map.fitBounds(bounds, {});
  }
}
