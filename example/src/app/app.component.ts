import { Component, ViewEncapsulation } from '@angular/core';
import { GuruHeaderFooterPosition, GuruSidebarLeftComponent } from '@guru/lib/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  mlOptions: ICardOption = {
    HeaderPosition: 'fixed',
    FooterPosition: 'fixed'
  };
}

interface ICardOption {
  HeaderPosition?: GuruHeaderFooterPosition;
  FooterPosition?: GuruHeaderFooterPosition;
}
