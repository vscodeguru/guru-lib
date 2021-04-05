import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GuruHeaderFooterPosition } from '@guru/card';

@Component({
  selector: 'vertical-layout-one',
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayoutOneComponent implements OnInit {
  headerPosition: GuruHeaderFooterPosition = 'below-static';
  footerPosition: GuruHeaderFooterPosition = 'below-static';
  showHeder = true;

  constructor() { }
  ngOnInit(): void {
  }


  counter(i: number): Array<number> {
    return new Array(i);
  }

  log(msg: string): void {
    console.log(msg);
  }
}
