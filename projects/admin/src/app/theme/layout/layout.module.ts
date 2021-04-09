import { NgModule } from '@angular/core';
import { HorizontalLayoutOneModule, HorizontalLayoutTwoModule } from './horizontal';
import { VerticalLayoutOneModule, VerticalLayoutTwoModule } from './vertical';

@NgModule({
  imports: [
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
