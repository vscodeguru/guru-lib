import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalLayoutOneComponent } from './layout-one.component';
import { FlexLayoutModule } from '@angular/flex-layout';


import { GuruCardModule } from '@guru/card';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatrixSidebarModule } from '../../components/sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ColorPickerModule } from 'ngx-color-picker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    GuruCardModule,
    MatrixSidebarModule,
    NzFormModule,
    ColorPickerModule
  ],
  declarations: [
    VerticalLayoutOneComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [VerticalLayoutOneComponent],
})
export class VerticalLayoutOneModule { }
