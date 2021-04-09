import {
  AfterContentInit, AfterViewInit, ChangeDetectionStrategy,
  Component, ElementRef, HostBinding, Inject,
  Input, KeyValueDiffers, NgZone, Optional, PLATFORM_ID, ViewChild, ViewContainerRef
} from '@angular/core';
import { GuruContentScrollComponent } from './content-scroll.component';
import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from './content-scroll.inteface';

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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuruContentComponent extends GuruContentScrollComponent implements AfterContentInit, AfterViewInit {
  @HostBinding('class.guru-content-wrapper') GuruContentWrapper = true;
  @HostBinding('class.scrollable')
  @Input() enableScroller = true;
  @ViewChild('vcStaticHeader', { read: ViewContainerRef }) public vcStaticHeader!: ViewContainerRef;
  @ViewChild('vcStaticFooter', { read: ViewContainerRef }) public vcStaticFooter!: ViewContainerRef;
  constructor(
    zone: NgZone, differs: KeyValueDiffers, elementRef: ElementRef<any>,
    // tslint:disable-next-line: ban-types
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(PERFECT_SCROLLBAR_CONFIG) defaults: PerfectScrollbarConfigInterface
  ) {
    super(zone, differs, elementRef, platformId, defaults);
  }
  ngAfterContentInit(): void {
  }
  ngAfterViewInit(): void {
    this.enableScrolbar = true;
    if (this.enableScrolbar) {
      setTimeout(() => {
        this._init();
      }, 100);
    }
  }
}
