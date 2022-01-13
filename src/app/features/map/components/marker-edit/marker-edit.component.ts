import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkerCity } from '../../models/marker-city';
import { MarkerStoreService } from '../../services/marker-store.service';

@Component({
  selector: 'app-marker-edit',
  templateUrl: './marker-edit.component.html',
  styleUrls: ['./marker-edit.component.scss'],
})
export class MarkerEditComponent {
  markerCity$!: Observable<MarkerCity[]>;
  newAddress = '';
  markerToAdded!: MarkerCity;

  constructor(private markerStoreService: MarkerStoreService) {
    this.markerCity$ = this.markerStoreService.getMarkerByCity();
  }

  onAddress(markerCity: MarkerCity) {
    this.markerToAdded = markerCity;
    if (typeof this.markerToAdded.id !== 'undefined') {
      this.onAddMarker();
    }
  }

  onRemoveMarker(markerCity: MarkerCity) {
    this.markerStoreService.removeMarkerByCity(markerCity);
  }

  onAddMarker() {
    if (this.markerToAdded && typeof this.markerToAdded.id === 'undefined') {
      this.markerStoreService.addMarkerByCity(this.markerToAdded);
    } else {
      this.markerStoreService.updateMarkerByCity(this.markerToAdded);
    }

    this.eraseAddress();
  }

  eraseAddress() {
    this.newAddress = '';
  }
}
