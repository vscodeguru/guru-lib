import { AfterViewInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GuruHeaderFooterPosition, GuruSidebarLeftComponent, GuruSidebarRightComponent } from '@guru/card';
import { ITheme, ThemeService } from 'projects/admin/src/app/core';
import { GuruCookieService } from 'projects/admin/src/app/core/service/cookie.service';
import { HttpService } from 'projects/admin/src/app/core/service/http.service';
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
  constructor(private srvTheme: ThemeService, private http: HttpService, private cookie: GuruCookieService) {
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
  invoke(): void {
    this.cookie.SyncFingerPrintKey().then((data: string | undefined) => { console.log(data); });
    this.http.get<any>('https://api.richieese.in/auth/login/vscodeguru/EEXITYzUX8hXFedL__1UqXw==/true/1').subscribe({
      next: (data: any) => { console.log('success', data); },
      error: (error: any) => { console.log('error', error); }
    });
  }
}
