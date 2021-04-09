import { NgModule } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { MatrixSidebarLeftComponent } from './left/sidebar.component';
import { GuruCardModule } from '@guru/card';

@NgModule({
  imports: [NzMenuModule, NzIconModule, GuruCardModule],
  declarations: [MatrixSidebarLeftComponent],
  exports: [MatrixSidebarLeftComponent],
  providers: [],
})
export class MatrixSidebarModule { }
