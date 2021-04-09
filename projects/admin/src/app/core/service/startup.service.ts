import { Injectable } from '@angular/core';
import { ThemeService } from './theme.service';

@Injectable()
export class StartupService {
  constructor(
    private srvTheme: ThemeService
  ) { }
  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Register Theme
      Promise.all([
        this.srvTheme.registerTheme(undefined)
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
