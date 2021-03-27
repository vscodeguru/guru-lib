import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';


import {
  GuruCardComponent
} from './card.component';
import {
  GuruSidebarLeftComponent,
  GuruSidebarRightComponent,
  GuruHeaderComponent,
  GuruContentComponent,
  GuruFooterComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule
  ],
  declarations: [
    GuruSidebarLeftComponent,
    GuruSidebarRightComponent,
    GuruCardComponent,
    GuruHeaderComponent,
    GuruContentComponent,
    GuruFooterComponent
  ],
  exports: [
    GuruSidebarLeftComponent,
    GuruSidebarRightComponent,
    GuruCardComponent,
    GuruHeaderComponent,
    GuruContentComponent,
    GuruFooterComponent
  ],
  providers: [],
})
export class GuruCardModule { }
