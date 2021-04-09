import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GuruHeaderFooterPosition } from '@guru/card';
import { IStyle, ITheme, ThemeService } from 'projects/admin/src/app/core';
@Component({
  selector: 'vertical-layout-one',
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalLayoutOneComponent implements OnInit {
  headerPosition: GuruHeaderFooterPosition = 'below-fixed';
  footerPosition: GuruHeaderFooterPosition = 'below-fixed';
  width = '250px';
  _width = 250;
  showHeder = true;
  mlTheme: ITheme;
  data: any = {};
  constructor(private srvTheme: ThemeService) { this.mlTheme = srvTheme.themeDefaults; }
  ngOnInit(): void { }

  getKeys(data: { [key: string]: IStyle }): string[] {
    return Object.keys(data || {});
  }
  counter(i: number): Array<number> {
    return new Array(i);
  }
  print(event: any, str: string): void {
    console.log(event, str);
  }
  preview(): void {
    this.srvTheme.registerTheme(this.mlTheme);
  }
  func(): void {
    this._width = this._width + 10;
    this.width = this._width + 'px';
  }
}
