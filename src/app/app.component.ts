import { Component } from '@angular/core';
import { MarkerService } from './features/map/services/marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private markerService: MarkerService) {
    this.markerService.initialize();
  }
}
