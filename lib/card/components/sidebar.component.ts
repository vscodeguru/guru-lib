import { AfterContentChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GuruSidebarMode, GuruSidebarPosition, CardHelper } from '../helper/card.helper';

@UntilDestroy()
@Component({
  selector: 'guru-sidebar',
  template: `<ng-content></ng-content>`
})
export class GuruSidebarComponent implements OnChanges, OnInit, AfterContentChecked, AfterViewInit, OnDestroy {
  private _nav!: MatSidenav;
  protected _position!: GuruSidebarPosition;
  private set position(value: GuruSidebarPosition) { this._position = value; }
  // Input
  @Input() width: string;
  @Input() autoFocus: boolean;
  @Input() disableClose: boolean;
  @Input() mode: GuruSidebarMode;
  @Input() opened: boolean;
  // Output
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter(undefined);
  @Output() openedStart: EventEmitter<void> = new EventEmitter(undefined);
  @Output() closedStart: EventEmitter<void> = new EventEmitter(undefined);
  // LifeCycle Envent
  ngOnChanges(changes: SimpleChanges): void { }
  ngOnInit(): void { }
  ngAfterContentChecked(): void { }
  ngAfterViewInit(): void { }
  ngOnDestroy(): void { }
  // Methods
  close(): void { this._nav.close(); }
  open(): void { this._nav.open(); }
  toogle(): void { this._nav.toggle(); }

  bind(nav: MatSidenav): void {
    this._nav = nav;
    this.width = !CardHelper.isValidObj(this.width) ? '200px' : this.width;
    this._nav.mode = !CardHelper.isValidObj(this.mode) ? 'side' : this.mode;
    this._nav.autoFocus = !CardHelper.isValidObj(this.autoFocus) ? false : this.autoFocus;
    this._nav.disableClose = !CardHelper.isValidObj(this.disableClose) ? false : this.disableClose;
    this._nav.opened = !CardHelper.isValidObj(this.opened) ? true : this.opened;

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
}


@Component({
  selector: 'guru-sidebar-left',
  template: `<ng-content></ng-content>`
})

export class GuruSidebarLeftComponent extends GuruSidebarComponent {
  constructor() {
    super();
    this._position = 'start';
  }
}


@Component({
  selector: 'guru-sidebar-right',
  template: `<ng-content></ng-content>`
})
export class GuruSidebarRightComponent extends GuruSidebarComponent {
  constructor() {
    super();
    this._position = 'end';
  }
}

