import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalLayoutOneComponent } from './layout-one.component';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GuruCardModule } from '@guru/card';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatrixSidebarModule } from '../../components/sidebar/sidebar.module';

@NgModule({
  imports: [
    CommonModule, MatSidenavModule, FlexLayoutModule, MatToolbarModule, GuruCardModule,
    MatrixSidebarModule
  ],
  declarations: [
    VerticalLayoutOneComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [VerticalLayoutOneComponent],
})
export class VerticalLayoutOneModule { }
