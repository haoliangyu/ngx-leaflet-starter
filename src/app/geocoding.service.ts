import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Location } from "./location";
import * as L from "leaflet";

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class GeocodingService {
  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  geocode(address: string) {
    return this.http
      .get(
        "http://maps.googleapis.com/maps/api/geocode/json?address=" +
          encodeURIComponent(address)
      )
      .map(res => res.json())
      .map(result => {
        if (result.status !== "OK") {
          throw new Error("unable to geocode address");
        }

        const location = new Location();
        location.address = result.results[0].formatted_address;
        location.latlng = L.latLng(result.results[0].geometry.location);

        const viewPort = result.results[0].geometry.viewport;
        location.viewBounds = L.latLngBounds(
          {
            lat: viewPort.southwest.lat,
            lng: viewPort.southwest.lng
          },
          {
            lat: viewPort.northeast.lat,
            lng: viewPort.northeast.lng
          }
        );

        return location;
      });
  }

  getCurrentLocation() {
    return this.http
      .get("http://ipv4.myexternalip.com/json")
      .map(res => res.json().ip)
      .flatMap(ip => this.http.get("http://freegeoip.net/json/" + ip))
      .map((res: Response) => res.json())
      .map(result => {
        const location = new Location();

        location.address =
          result.city +
          ", " +
          result.region_code +
          " " +
          result.zip_code +
          ", " +
          result.country_code;
        location.latlng = L.latLng(result.latitude, result.longitude);

        return location;
      });
  }
}
