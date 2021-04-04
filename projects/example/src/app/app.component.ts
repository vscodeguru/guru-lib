import { Component, ViewEncapsulation } from '@angular/core';
import { GuruHeaderFooterPosition } from '@guru/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  type = 'TYPE-1';
  mlOptions: ICardOption = {
    HeaderPosition: 'above-fixed',
    FooterPosition: 'above-fixed'
  };
}

interface ICardOption {
  HeaderPosition?: GuruHeaderFooterPosition;
  FooterPosition?: GuruHeaderFooterPosition;
}
