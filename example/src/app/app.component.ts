import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GuruSidebarLeftComponent } from '@guru/lib/card';

@Component({
  selector: 'app-root',
  template: `
    <guru-card>
      <guru-sidebar-left #navLeft></guru-sidebar-left>
      <guru-header></guru-header>
      <guru-content>
      <button (click)="onClick(navLeft)">Toogle Left Sidebar</button>
      </guru-content>
      <guru-footer></guru-footer>
    </guru-card>
  `,
  styles: []
})
export class AppComponent {
  width = 100;
  Curwidth = 200;
  title = 'example';
  onClick(navLeft: GuruSidebarLeftComponent): void {
    this.Curwidth = this.Curwidth + this.width;
    navLeft.width = this.Curwidth + 'px';
  }
}
