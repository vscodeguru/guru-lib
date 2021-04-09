import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { MatrixHeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, NzButtonModule, NzIconModule, NzAvatarModule, NzDropDownModule],
  declarations: [MatrixHeaderComponent],
  exports: [MatrixHeaderComponent],
  providers: [],
})
export class MatrixHeaderModule { }
