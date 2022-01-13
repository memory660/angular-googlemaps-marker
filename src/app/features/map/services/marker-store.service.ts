import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MarkerCity } from '../models/marker-city';

@Injectable({
  providedIn: 'root',
})
export class MarkerStoreService {
  markerByCity$ = new BehaviorSubject<MarkerCity[]>([]);

  getMarkerByCity(): Observable<MarkerCity[]> {
    return this.markerByCity$.asObservable();
  }

  addMarkerByCity(markerCity: MarkerCity) {
    if (!this.markerByCity$.value.includes(markerCity)) {
      this.markerByCity$.next([...this.markerByCity$.value, markerCity]);
    }
  }

  updateMarkerByCity(markerCity: MarkerCity) {
    const arr: MarkerCity[] = this.markerByCity$.value;
    arr.forEach((t, i) => {
      if (t.id === markerCity.id) {
        arr[i] = markerCity;
      }
    });

    this.markerByCity$.next(arr);
  }

  removeMarkerByCity(markerCity: MarkerCity) {
    const markerCityAll: MarkerCity[] = this.markerByCity$
      .getValue()
      .filter((mc: MarkerCity) => mc.id !== markerCity.id);

    this.markerByCity$.next(markerCityAll);
  }
}
