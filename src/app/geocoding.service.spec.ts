import { TestBed, inject } from "@angular/core/testing";

import { GeocodingService } from "./geocoding.service";

describe("GeocodingService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeocodingService]
    });
  });

  it(
    "should be created",
    inject([GeocodingService], (service: GeocodingService) => {
      expect(service).toBeTruthy();
    })
  );
});
