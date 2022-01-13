import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapFullComponent } from './components/map-full/map-full.component';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment';
import { MarkerComponent } from './components/marker/marker.component';
import { MarkerEditComponent } from './components/marker-edit/marker-edit.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    MapFullComponent,
    MarkerComponent,
    MarkerEditComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiGoogleKey,
      libraries: ['places'],
    }),
    AgmDirectionModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [MapFullComponent, MarkerEditComponent],
})
export class MapModule {}
