import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuruCardModule } from '@guru/card';
import { LayoutModule } from './theme/layout/layout.module';
import { RouterModule } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  StartupService,
  LoaderService,
  LazyAssetsService,
  ThemeService
} from './core/service';
import { HttpService } from './core/service/http.service';
import { GuruCookieService } from './core/service/cookie.service';


export function StartupServiceFactory(startupService: StartupService): any {
  return () => startupService.load();
}

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    GuruCardModule,
    LayoutModule,
    NzSpinModule,
    FlexLayoutModule,
    NzIconModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    LazyAssetsService,
    ThemeService,
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderService, multi: true },
    HttpService,
    GuruCookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
