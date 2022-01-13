import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { MapModule } from '../features/map/map.module';
import { HeaderModule } from '../features/header/header.module';

@NgModule({
  declarations: [Page1Component, Page2Component],
  imports: [CommonModule, MapModule],
})
export class PagesModule {}
