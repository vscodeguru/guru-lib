import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HorizontalLayoutOneModule, HorizontalLayoutTwoModule } from './horizontal';
import { VerticalLayoutOneModule, VerticalLayoutTwoModule } from './vertical';

@NgModule({
  imports: [
    CommonModule,
    HorizontalLayoutOneModule,
    HorizontalLayoutTwoModule,

    VerticalLayoutOneModule,
    VerticalLayoutTwoModule
  ],
  exports: [
    HorizontalLayoutOneModule,
    HorizontalLayoutTwoModule,

    VerticalLayoutOneModule,
    VerticalLayoutTwoModule
  ],
  declarations: [],
  providers: [],
})
export class LayoutModule { }
