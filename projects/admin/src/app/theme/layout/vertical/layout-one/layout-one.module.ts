import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalLayoutOneComponent } from './layout-one.component';
import { FlexLayoutModule } from '@angular/flex-layout';


import { GuruCardModule } from '@guru/card';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatrixSidebarModule } from '../../components/sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatrixHeaderModule } from '../../components/header/header.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    GuruCardModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzGridModule,
    ColorPickerModule,

    // Matrix
    MatrixSidebarModule,
    MatrixHeaderModule,
  ],
  declarations: [
    VerticalLayoutOneComponent,
    FooterComponent
  ],
  exports: [VerticalLayoutOneComponent],
})
export class VerticalLayoutOneModule { }
