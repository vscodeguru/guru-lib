import { AfterViewInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GuruHeaderFooterPosition, GuruSidebarLeftComponent, GuruSidebarRightComponent } from '@guru/card';
import { ITheme, ThemeService } from 'projects/admin/src/app/core';
@Component({
  selector: 'vertical-layout-one',
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalLayoutOneComponent implements OnInit, AfterViewInit {
  headerPosition: GuruHeaderFooterPosition = 'below-fixed';
  footerPosition: GuruHeaderFooterPosition = 'below-fixed';
  sidebarLeftWidth = '250px';
  mlTheme!: ITheme;
  data: any = {};
  @ViewChild('guruSidebarLeft') guruSidebarLeft!: GuruSidebarLeftComponent;
  @ViewChild('guruSidebarRight') guruSidebarRight!: GuruSidebarRightComponent;
  constructor(private srvTheme: ThemeService) {
    // tslint:disable-next-line: deprecation
    this.srvTheme.themeRegistered.subscribe(
      {
        next: (theme) => {
          if (theme !== undefined) {
            this.mlTheme = theme;
            this.headerPosition = this.mlTheme.header['layout-header-position'].default as any;
            this.footerPosition = this.mlTheme.footer['layout-footer-position'].default as any;
            this.headerPosition = this.mlTheme.header['layout-header-position'].default as any;
            this.sidebarLeftWidth = this.mlTheme.sidebar['layout-sider-width'].default as any;
          }
        }
      }
    );
  }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    // tslint:disable-next-line: deprecation
    this.srvTheme.toggleChanged.subscribe(
      {
        next: (nav) => {
          if (nav === 'left') {
            this.guruSidebarLeft.toggle();
          } else if (nav === 'right') {
            this.guruSidebarRight.toggle();
          }
        }
      }
    );
  }
}
