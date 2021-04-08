import { AfterViewInit, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardService } from '@guru/card/service/card.service';
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
  constructor(private srvCard: CardService) { }
  ngAfterViewInit(): void {
    this.srvCard._footerPositionChanges.next(this.position);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.position.currentValue !== changes.position.previousValue) {
      this.srvCard._footerPositionChanges.next(this.position);
    }
  }
}
