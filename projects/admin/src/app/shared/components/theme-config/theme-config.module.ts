import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { GuruCardModule } from '@guru/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ColorPickerModule } from 'ngx-color-picker';

import { ThemeConfigComponent } from './theme-config.component';

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
    ColorPickerModule
  ],
  declarations: [ThemeConfigComponent],
  exports: [ThemeConfigComponent],
  providers: [],
})
export class ThemeConfigModule { }
