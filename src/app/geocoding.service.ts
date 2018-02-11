import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Location } from "./location";
import * as L from "leaflet";

import "rxjs/add/operator/map";

@Injectable()
export class GeocodingService {
  constructor(private http: HttpClient) {}

  geocode(address: string) {
    return this.http
      .get(
        "http://maps.googleapis.com/maps/api/geocode/json?address=" +
          encodeURIComponent(address)
      )
      .map((result: any) => {
        if (result.status !== "OK") {
          throw new Error(`Unable to geocode address: ${address}`);
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

  getClientLocation() {
    return this.http
      .get("http://ipv4.myexternalip.com/json")
      .flatMap((result: any) =>
        this.http.get(`https://ipapi.co/${result.ip}/json`)
      )
      .map((result: any) => {
        const location = new Location();

        location.address =
          result.city + ", " + result.region + ", " + result.country;
        location.latlng = L.latLng(result.latitude, result.longitude);

        return location;
      });
  }
}
