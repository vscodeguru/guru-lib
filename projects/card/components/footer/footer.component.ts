import { AfterViewInit, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GuruHeaderFooterPosition } from '../../helper/card.helper';

@Component({
  selector: 'guru-footer',
  template: `
    <mat-toolbar class="guru-footer-toolbar">
      <ng-content></ng-content>
    </mat-toolbar>
  `
})
export class GuruFooterComponent implements OnChanges, AfterViewInit {
  @HostBinding('class.guru-footer') GuruFooter = true;
  @Input() position: GuruHeaderFooterPosition = 'above-fixed';
  readonly _positionChanges = new BehaviorSubject<GuruHeaderFooterPosition>(this.position);
  ngAfterViewInit(): void {
    this._positionChanges.next(this.position);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.position.currentValue !== changes.position.previousValue) {
      this._positionChanges.next(this.position);
    }
  }
}