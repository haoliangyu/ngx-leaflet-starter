import { LatLngBounds, LatLng } from "leaflet";

export class Location {
  latlng: LatLng;
  address: string;
  viewBounds: LatLngBounds;
}
