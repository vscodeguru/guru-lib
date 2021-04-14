import { Injectable } from '@angular/core';
import _ from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { CrazyKey } from '../helper/CrazyKey';
import { Guru } from '../helper/Guru';
import { Cookies, IWebRespose } from '../model';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GuruCookieService {
  constructor(private srvCookie: CookieService, private httpClient: HttpClient) { }
  public isApiKeyReady(): boolean {
    return !_.isEmpty(this.srvCookie.get(Cookies.ApiKey));
  }
  public isFingerPrintReady(): boolean {
    return !_.isEmpty(this.srvCookie.get(Cookies.FingerPrint));
  }
  public isAuthKeyReady(): boolean {
    return !_.isEmpty(this.srvCookie.get(Cookies.Authkey));
  }
  public isUrlKeyReady(): boolean {
    return !_.isEmpty(this.srvCookie.get(Cookies.UrlKey));
  }

  public get ApiKey(): string {
    try {
      const apiCookieArr = (this.srvCookie.get(Cookies.ApiKey) || '').split('.');
      if (!Guru.isValidObj(apiCookieArr) || apiCookieArr.length !== 2) {
        return '';
      }
      return CrazyKey.decode(apiCookieArr[0]);
    } catch (error) {
      return '';
    }
  }
  public get Authkey(): string {
    try {
      const authCookieArr = (this.srvCookie.get(Cookies.Authkey) || '').split('.');
      if (!Guru.isValidObj(authCookieArr) || authCookieArr.length !== 2) {
        return '';
      }

      return CrazyKey.decode(authCookieArr[0]);
    } catch (error) {
      return '';
    }
  }
  public get PrivateKey(): string {
    try {
      const authCookieArr = (this.srvCookie.get(Cookies.Authkey) || '').split('.');
      if (!Guru.isValidObj(authCookieArr) || authCookieArr.length !== 2) {
        return '';
      }
      return CrazyKey.decode(authCookieArr[1]);
    } catch (error) {
      return '';
    }
  }
  public get FingerPrint(): string {
    try {
      const fpKey = this.srvCookie.get(Cookies.FingerPrint);
      if (!Guru.isValidObj(fpKey)) {
        return '';
      }
      return fpKey;
    } catch (error) {
      return '';
    }
  }
  public get ApiUrl(): string {
    try {
      const authCookieArr = (this.srvCookie.get(Cookies.UrlKey) || '').split('.');
      if (!Guru.isValidObj(authCookieArr) || authCookieArr.length !== 3) {
        return '';
      }
      const i = CrazyKey.aes_decryption(CrazyKey.decode(authCookieArr[0]), this.PrivateKey);
      return i;
    } catch (error) {
      return '';
    }
  }
  public get DataUrl(): string {
    try {
      const authCookieArr = (this.srvCookie.get(Cookies.UrlKey) || '').split('.');
      if (!Guru.isValidObj(authCookieArr) || authCookieArr.length !== 3) {
        return '';
      }

      return CrazyKey.aes_decryption(CrazyKey.decode(authCookieArr[1]), this.PrivateKey);
    } catch (error) {
      return '';
    }
  }
  public get ReportUrl(): string {
    try {
      const authCookieArr = (this.srvCookie.get(Cookies.UrlKey) || '').split('.');
      if (!Guru.isValidObj(authCookieArr) || authCookieArr.length !== 3) {
        return '';
      }

      return CrazyKey.aes_decryption(CrazyKey.decode(authCookieArr[2]), this.PrivateKey);
    } catch (error) {
      return '';
    }
  }
  public get UserData(): string {
    try {
      const apiCookieArr = (this.srvCookie.get(Cookies.ApiKey) || '').split('.');
      if (!Guru.isValidObj(apiCookieArr) || apiCookieArr.length !== 2) {
        return '';
      }

      return CrazyKey.aes_decryption(CrazyKey.decode(apiCookieArr[1]), this.PrivateKey);
    } catch (error) {
      return '';
    }
  }

  public SyncFingerPrintKey(): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      try {
        if (!_.isEmpty(this.FingerPrint)) {
          console.log('already exist...!');
          resolve(this.FingerPrint);
        } else {
          FingerprintJS.load().then(data => data.get()).then(data => {
            const expires = moment().add(30, 'days').toDate();
            this.srvCookie.set(Cookies.FingerPrint, data.visitorId, expires, '/');
            resolve(data.visitorId);
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  public SyncAuthtKey(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.httpClient.get<IWebRespose<boolean>>('/auth/sync-key').subscribe(AppResponse => {
          if (!_.isNull(AppResponse) && !_.isUndefined(AppResponse) && AppResponse.Code === 2000.01 && AppResponse.Data) {
            resolve(AppResponse.Data);
          } else {
            resolve(false);
          }
        }, reqError => {
          reject(reqError);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}
