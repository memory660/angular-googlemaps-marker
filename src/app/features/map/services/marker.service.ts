import { ElementRef, Injectable, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Marker } from '../models/marker';
import { MarkerStoreService } from './marker-store.service';
import { environment } from 'src/environments/environment';
import { MarkerCity } from '../models/marker-city';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  geoCoder!: google.maps.Geocoder;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private markerStoreService: MarkerStoreService
  ) {}

  getCurrentLocation(): Promise<Marker> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 10,
          } as Marker);
        });
      }
    });
  }

  getLocationByStr(arr: string[]) {
    this.mapsAPILoader.load().then(() => {
      this.ngZone.run(() => {
        this.geoCoder = new google.maps.Geocoder();
        this.addItemToMarker(arr);
      });
    });
  }

  async addItemToMarker(arr: string[]) {
    arr.forEach((term: string) => {
      this.geoCode(term).then((marker: Marker) => {
        this.getMAxId().then((maxId: number) => {
          const markerCity: MarkerCity = {
            id: maxId + 1,
            city: { name: term } as City,
            marker: marker,
          } as MarkerCity;
          this.markerStoreService.addMarkerByCity(markerCity);
        });
      });
    });
  }

  getMAxId(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.markerStoreService
        .getMarkerByCity()
        .subscribe((mc: MarkerCity[]) => {
          let max = 0;
          mc.forEach((m: MarkerCity) => {
            if (m.id > max) max = m.id;
          });

          resolve(max);
        });
    });
  }

  geoCode(str: string): Promise<Marker> {
    return new Promise((resolve, reject) => {
      this.geoCoder.geocode(
        {
          address: str,
        },
        (results: any, status: string) => {
          if (status == 'OK') {
            const location = results[0].geometry?.location;
            resolve({
              latitude: location.lat(),
              longitude: location.lng(),
              markerDraggable: false,
              zoom: 10,
              address: str,
            } as Marker);
          }
          return {} as Marker;
        }
      );
    });
  }

  initialize() {
    this.getLocationByStr(environment.cities);
  }

  createMarkerCity(
    id: number,
    address: string,
    lat: number,
    lng: number
  ): MarkerCity {
    return {
      id: id,
      city: {
        name: address,
      } as City,
      marker: {
        latitude: lat,
        longitude: lng,
        markerDraggable: false,
        zoom: 10,
        address: address,
      } as Marker,
    } as MarkerCity;
  }
}
