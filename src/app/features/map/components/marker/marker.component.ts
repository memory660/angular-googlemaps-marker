import { Component, Input, OnInit } from '@angular/core';
import { Marker } from '../../models/marker';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
})
export class MarkerComponent {
  @Input() marker!: Marker;

  constructor() {}
}
