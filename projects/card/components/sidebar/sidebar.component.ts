import {
  AfterContentChecked, AfterViewInit, Component,
  EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GuruSidebarMode, CardHelper, GuruBreakpointMode } from '../../helper/card.helper';
import * as _ from 'lodash';
@UntilDestroy()
@Component({
  selector: 'guru-sidebar',
  template: `<ng-content></ng-content>`
})
export class GuruSidebarComponent implements OnChanges, OnInit, AfterContentChecked, AfterViewInit, OnDestroy {
  private _nav!: MatSidenav;
  // Input
  @Input() width!: string;
  @Input() autoFocus!: boolean;
  @Input() disableClose!: boolean;
  @Input() mode!: GuruSidebarMode;
  @Input() opened!: boolean;

  @Input() guruXs: GuruBreakpointMode = { opened: false, mode: 'over' };
  @Input() guruSm: GuruBreakpointMode = { opened: false, mode: 'over' };
  @Input() guruMd: GuruBreakpointMode = { opened: false, mode: 'over' };
  @Input() guruLg: GuruBreakpointMode = { opened: false, mode: 'over' };
  @Input() guruXl!: GuruBreakpointMode;

  // Output
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter(undefined);
  @Output() openedStart: EventEmitter<void> = new EventEmitter(undefined);
  @Output() closedStart: EventEmitter<void> = new EventEmitter(undefined);

  // LifeCycle Envent
  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }
  ngOnChanges(_changes: SimpleChanges): void { }
  ngOnInit(): void { }
  ngAfterContentChecked(): void { }
  ngAfterViewInit(): void { }
  ngOnDestroy(): void { }
  // Methods
  close(): void { this._nav.close(); }
  open(): void { this._nav.open(); }
  toggle(): void { this._nav.toggle(); }

  bind(nav: MatSidenav): void {
    this._nav = nav;
    this.width = !CardHelper.isValidObj(this.width) ? '200px' : this.width;
    this.mode = !CardHelper.isValidObj(this.mode) ? 'side' : this.mode;
    this.autoFocus = !CardHelper.isValidObj(this.autoFocus) ? false : this.autoFocus;
    this.disableClose = !CardHelper.isValidObj(this.disableClose) ? false : this.disableClose;
    this.opened = !CardHelper.isValidObj(this.opened) ? true : this.opened;

    this.guruLg = { mode: this.mode, opened: this.opened };
    if (!CardHelper.isValidObj(this.guruXl)) {
      this.guruXl = { mode: this.mode, opened: this.opened };
    }

    this._nav.mode = this.guruLg.mode;
    this._nav.autoFocus = this.autoFocus;
    this._nav.disableClose = this.disableClose;
    this._nav.opened = this.guruLg.opened;

    this._addResponsive();

    // tslint:disable: deprecation
    this._nav.openedChange.pipe(untilDestroyed(this)).subscribe(
      {
        next: (value) => this.openedChange.next(value)
      }
    );
    this._nav.openedStart.pipe(untilDestroyed(this)).subscribe(
      {
        next: (value) => this.openedStart.next(value)
      }
    );
    this._nav.closedStart.pipe(untilDestroyed(this)).subscribe(
      {
        next: (value) => this.closedStart.next(value)
      }
    );
  }
  private _addResponsive(): void {
    const breakpoints = [];
    if (CardHelper.isValidObj(this.guruXs)) {
      breakpoints.push(Breakpoints.XSmall);
    }
    if (CardHelper.isValidObj(this.guruSm)) {
      breakpoints.push(Breakpoints.Small);
    }
    if (CardHelper.isValidObj(this.guruMd)) {
      breakpoints.push(Breakpoints.Medium);
    }
    if (CardHelper.isValidObj(this.guruLg)) {
      breakpoints.push(Breakpoints.Large);
    }
    if (CardHelper.isValidObj(this.guruXl)) {
      breakpoints.push(Breakpoints.XLarge);
    }
    if (breakpoints && breakpoints.length > 0) {
      this.breakpointObserver.observe(breakpoints).subscribe(state => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          this._setSidebarState(this.guruXs);
        }
        if (state.breakpoints[Breakpoints.Small]) {
          this._setSidebarState(this.guruSm);
        }
        if (state.breakpoints[Breakpoints.Medium]) {
          this._setSidebarState(this.guruMd);
        }
        if (state.breakpoints[Breakpoints.Large]) {
          this._setSidebarState(this.guruLg);
        }
        if (state.breakpoints[Breakpoints.XLarge]) {
          this._setSidebarState(this.guruXl);
        }
      });
    }
  }
  private _setSidebarState(brkMode: GuruBreakpointMode): void {
    this._nav.mode = brkMode.mode;
    this._nav.opened = brkMode.opened;
  }
}


@Component({
  selector: 'guru-sidebar-left',
  template: `<ng-content></ng-content>`
})

export class GuruSidebarLeftComponent extends GuruSidebarComponent {
  constructor(
    _breakpointObserver: BreakpointObserver
  ) {
    super(_breakpointObserver);
  }
}


@Component({
  selector: 'guru-sidebar-right',
  template: `<ng-content></ng-content>`
})
export class GuruSidebarRightComponent extends GuruSidebarComponent {
  constructor(
    _breakpointObserver: BreakpointObserver
  ) {
    super(_breakpointObserver);
  }
}

