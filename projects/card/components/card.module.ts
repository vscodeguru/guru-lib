import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { GuruCardComponent } from './card';
import { GuruHeaderComponent } from './header';
import { GuruContentComponent, GuruContentScrollComponent } from './content';
import { GuruFooterComponent } from './footer';
import { GuruSidebarLeftComponent, GuruSidebarRightComponent, GuruSidebarComponent } from './sidebar';


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
