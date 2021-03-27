import { AfterContentInit, AfterViewInit, Component, ContentChild, EmbeddedViewRef, HostBinding, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { GuruContentScrollComponent } from './content-scroll.component';

@Component({
  selector: 'guru-content',
  template: `
  <!-- Static Header -->
  <ng-container #vcStaticHeader>
  </ng-container>
  <!-- Static Header End -->
  <!-- Content -->
  <div class="guru-content">
    <ng-content></ng-content>
  </div>
  <!-- Content End -->
  <!-- Static Footer -->
  <ng-container #vcStaticFooter>
  </ng-container>
  <!-- Static Footer End -->
  `
})
export class GuruContentComponent extends GuruContentScrollComponent implements AfterContentInit, AfterViewInit {
  @HostBinding('class.guru-content-wrapper')
  private GuruContentWrapper = true;
  @Input() enableScroller = true;
  @HostBinding('class.scrollable') private get _enableScroller(): boolean { return this.enableScroller; }
  @ViewChild('vcStaticHeader', { read: ViewContainerRef }) public vcStaticHeader!: ViewContainerRef;
  @ViewChild('vcStaticFooter', { read: ViewContainerRef }) public vcStaticFooter!: ViewContainerRef;


  ngAfterContentInit(): void {
  }
  ngAfterViewInit(): void {
    if (this.enableScroller) {
      this.scrollbarOptions = {
        enable: true
      };
    }
  }
}
