import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalLayoutOneComponent } from './layout-one.component';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GuruCardModule } from '@guru/card';

@NgModule({
  imports: [
    CommonModule, MatSidenavModule, FlexLayoutModule, MatToolbarModule, GuruCardModule
  ],
  declarations: [VerticalLayoutOneComponent],
  exports: [VerticalLayoutOneComponent],
})
export class VerticalLayoutOneModule { }
