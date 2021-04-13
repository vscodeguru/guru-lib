import { AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IStyle, ITheme, ThemeService } from 'projects/admin/src/app/core';
@Component({
  selector: 'theme-config',
  templateUrl: './theme-config.component.html',
  styleUrls: ['./theme-config.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeConfigComponent implements OnInit, AfterViewInit {
  mlTheme!: ITheme;
  constructor(private srvTheme: ThemeService) {
    // tslint:disable-next-line: deprecation
    this.srvTheme.themeRegistered.subscribe(
      {
        next: (theme) => {
          if (theme !== undefined) {
            this.mlTheme = theme;
          }
        }
      }
    );
  }
  ngOnInit(): void { }
  ngAfterViewInit(): void { }
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
}
