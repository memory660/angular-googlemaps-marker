import { MapsAPILoader } from '@agm/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Marker } from '../../models/marker';
import { MarkerCity } from '../../models/marker-city';
import { MarkerStoreService } from '../../services/marker-store.service';
import { MarkerService } from '../../services/marker.service';

@Component({
  selector: 'app-map-full',
  templateUrl: './map-full.component.html',
  styleUrls: ['./map-full.component.scss'],
})
export class MapFullComponent implements OnInit, OnDestroy {
  cMarker!: Marker;
  markers!: Marker[];
  markersCity$!: Observable<MarkerCity[]>;
  sub!: Subscription;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private markerService: MarkerService,
    private markerStoreService: MarkerStoreService
  ) {
    // récuperer les markers
    this.markersCity$ = this.markerStoreService.getMarkerByCity();
  }

  ngOnInit() {
    // initialiser la carte avec le 1er marker de la liste
    this.sub = this.markersCity$.subscribe((markersCity: MarkerCity[]) => {
      if (markersCity[0]) {
        this.cMarker = markersCity[0].marker;
      }
    });
  }

  onLocalisation() {
    this.mapsAPILoader.load().then(() => {
      this.markerService.getCurrentLocation().then((marker: Marker) => {
        this.cMarker = marker;
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
