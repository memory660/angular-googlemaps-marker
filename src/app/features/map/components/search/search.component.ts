import { MapsAPILoader } from '@agm/core';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MarkerCity } from '../../models/marker-city';
import { MarkerService } from '../../services/marker.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('search') searchElementRef!: ElementRef<HTMLInputElement>;
  @Input() address!: string;
  @Input() id!: number;
  @Input() modeCreate = false;
  @Output() addressEvent = new EventEmitter<MarkerCity>();
  geoCoder: any;
  disabled = true;
  set edit(value: boolean) {
    this.disabled = !value;
  }

  constructor(
    private markerService: MarkerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const markerCity: MarkerCity = this.markerService.createMarkerCity(
            this.id,
            this.searchElementRef.nativeElement.value,
            place.geometry?.location.lat(),
            place.geometry?.location.lng()
          );

          this.addressEvent.emit(markerCity);
          this.edit = false;
        });
      });
    });
  }

  ngAfterViewInit(): void {
    this.searchElementRef.nativeElement.value = this.address;
    this.cd.detectChanges();
  }

  ngOnChanges(): void {
    if (this.modeCreate) this.address = '';
  }
}
