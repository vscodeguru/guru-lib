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
  GuruFooterComponent,
  GuruSidebarComponent
} from './inner';
import { GuruContentScrollComponent } from './inner/content-scroll.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule
  ],
  declarations: [
    GuruContentScrollComponent,
    GuruSidebarComponent,
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
