import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { VerticalLayoutOneComponent } from './layout-one.component';

import { MatrixHeaderModule } from '../../components/header/header.module';
// import { MatrixSidebarModule } from '../../components/sidebar/sidebar.module';
import { FooterComponent } from '../../components/footer/footer.component';

import { GuruCardModule } from '@guru/card';
import { MatrixSidebarModule } from '../../components/sidebar/sidebar.module';
import { ThemeConfigModule } from 'projects/admin/src/app/shared/components/theme-config';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    GuruCardModule,
    ThemeConfigModule,
    // Matrix
    MatrixSidebarModule,
    MatrixHeaderModule
  ],
  declarations: [
    VerticalLayoutOneComponent,
    FooterComponent
  ],
  exports: [VerticalLayoutOneComponent],
})
export class VerticalLayoutOneModule { }
