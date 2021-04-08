import { Injectable } from '@angular/core';
import { GuruHeaderFooterPosition } from '../helper/card.helper';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CardService {
  readonly _headerPositionChanges = new BehaviorSubject<GuruHeaderFooterPosition>('above-fixed');
  readonly _footerPositionChanges = new BehaviorSubject<GuruHeaderFooterPosition>('above-fixed');
  readonly _sidebarChanges = new BehaviorSubject<boolean>(false);
  constructor() { }
}
