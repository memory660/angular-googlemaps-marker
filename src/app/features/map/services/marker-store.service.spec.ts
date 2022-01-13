import { TestBed } from '@angular/core/testing';
import { City } from '../models/city';
import { Marker } from '../models/marker';
import { MarkerCity } from '../models/marker-city';
import { MarkerStoreService } from './marker-store.service';

describe('MarkerStoreService', () => {
  let service: MarkerStoreService;
  let markerCity = {
    id: 10,
    city: {
      name: 'rome',
    } as City,
    marker: {
      latitude: 4.12,
      longitude: 41.12,
      markerDraggable: false,
      zoom: 10,
      address: 'rome',
    } as Marker,
  } as MarkerCity;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [MarkerStoreService],
    });
    service = TestBed.inject(MarkerStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getMarkerByCity()', () => {
    service.markerByCity$.next([]);
    service
      .getMarkerByCity()
      .subscribe((result) => expect(result.length).toEqual(0));
  });

  it('add addMarkerByCity()', () => {
    service.markerByCity$.next([markerCity]);
    service.getMarkerByCity().subscribe((result) => {
      expect(result.length).toEqual(1);
      expect(result).toEqual([markerCity]);
    });
  });

  it('add updateMarkerByCity(...)', () => {
    service.markerByCity$.next([markerCity]);
    let markercityUpdated: Array<MarkerCity> = [...[markerCity]];
    markercityUpdated[0].city.name = 'paris';
    service.updateMarkerByCity(markercityUpdated[0]);
    service.getMarkerByCity().subscribe((result) => {
      expect(result.length).toEqual(1);
      expect(result).toEqual(markercityUpdated);
    });
  });

  it('add removeMarkerByCity(...)', () => {
    service.markerByCity$.next([markerCity]);
    service.removeMarkerByCity(markerCity);
    service.getMarkerByCity().subscribe((result) => {
      expect(result.length).toEqual(0);
    });
  });
});
