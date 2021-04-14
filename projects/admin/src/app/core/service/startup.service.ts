import { Injectable } from '@angular/core';
import { GuruCookieService } from './cookie.service';
import { ThemeService } from './theme.service';

@Injectable()
export class StartupService {
  constructor(
    private srvTheme: ThemeService,
    private srvCookie: GuruCookieService
  ) { }
  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Register Theme
      Promise.all([
        this.srvTheme.registerTheme(undefined),
        this.srvCookie.SyncFingerPrintKey()
      ])
        .then(() => {
          resolve(null);
        })
        .catch(() => {
          reject(null);
        });
    });
  }
}
