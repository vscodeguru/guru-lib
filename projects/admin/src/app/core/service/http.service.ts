import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cookies, IHttpOption, IRequestServer, IRequestType, IWebError, IWebRespose } from '../model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { CrazyKey } from '../helper/CrazyKey';
import { GuruCookieService } from './cookie.service';

@Injectable()
export class HttpService {
  private defOption: IHttpOption = {
    RequestType: IRequestType.Protected,
    DefaultLogout: true,
    LoadingScreen: true
  };
  constructor(
    private http: HttpClient,
    private srvGuruCookie: GuruCookieService
  ) { }
  get<T>(
    url: string,
    usrOption?: IHttpOption
  ): Observable<IWebRespose<T> | IWebError> {
    // ! Merge Default & User Options
    usrOption = { ...this.defOption, ...usrOption };
    // ! Init Http Request
    return this.http.get<IWebRespose<T>>(
      this._handleUrl(url, usrOption),
      { headers: this._handleHeaders(usrOption), params: usrOption.params }
    ).pipe(
      // ! Success Respose
      mergeMap((value: IWebRespose<T>) => this._handleData<T>(value)),
      // ! Error Respose
      catchError((err: HttpErrorResponse) => this._handleData<T>(err))
    );
  }

  post<T>(
    url: string,
    body: any,
    usrOption?: IHttpOption
  ): Observable<IWebRespose<T> | IWebError> {
    // ! Merge Default & User Options
    usrOption = { ...this.defOption, ...usrOption };
    // ! Init Http Request
    return this.http.post<IWebRespose<T>>(
      this._handleUrl(url, usrOption),
      body,
      { headers: this._handleHeaders(usrOption), params: usrOption.params }
    ).pipe(
      // ! Success Respose
      mergeMap((value: IWebRespose<T>) => this._handleData<T>(value)),
      // ! Error Respose
      catchError((err: HttpErrorResponse) => this._handleData<T>(err))
    );
  }


  private _handleData<T>(event: IWebRespose<T> | HttpErrorResponse): Observable<IWebRespose<T> | IWebError> {
    if (event instanceof HttpErrorResponse) {
      const resp = new IWebError(undefined);
      switch (event.status) {
        case 0:
          if (!navigator.onLine) {
            resp.Code = 520;
            resp.Message = 'Please Check Your Internet Connection';
          }
          break;
      }
      return of(resp);
    } else if (event instanceof Object) {
      return of(event);
    } else {
      return of(event);
    }
  }
  private _handleUrl(url: string, options: IHttpOption): string {
    let _url = url;
    if (options.RequestServer === IRequestServer.Api) {
      const api = this.srvGuruCookie.ApiUrl;
      if (api === '') {
        throwError('Api Url Not Found');
      }
      _url = api + url;
    } else if (options.RequestServer === IRequestServer.Data) {
      const dataUrl = this.srvGuruCookie.DataUrl;
      if (dataUrl === '') {
        throwError('Data Url Not Found');
      }
      _url = dataUrl + url;
    } else {
      const api = this.srvGuruCookie.ApiUrl;
      if (api === '') {
        throwError('Api Url Not Found');
      }
      _url = api + url;
    }
    // Clean up any repeating slashes.
    return _url.replace(/([^:]\/)\/+/g, '$1');
  }
  private _handleHeaders(options: IHttpOption, AllowContentType = false): { [header: string]: string | string[] } {
    const defaultHeader: { [header: string]: string } = {};
    if (AllowContentType) {
      defaultHeader['Content-Type'] = 'application/json; charset=utf-8';
    }
    switch (options.RequestType) {
      case IRequestType.Guest:
        defaultHeader[Cookies.Authkey] = this._getRolloutAuthKey();
        break;
      case IRequestType.Protected:
        defaultHeader[Cookies.ApiKey] = this._getRolloutApiKey();
        break;
    }
    return Object.assign(options.headers || {}, defaultHeader);
  }

  private _getRolloutApiKey(): string {
    const apiKey = CrazyKey.encode(this.srvGuruCookie.ApiKey);
    const privateKey = CrazyKey.encode(this.srvGuruCookie.PrivateKey);
    const fpKey = CrazyKey.encode(this.srvGuruCookie.FingerPrint);
    return `${apiKey}.${privateKey}.${fpKey}`;
  }
  private _getRolloutAuthKey(): string {
    const authKey = CrazyKey.encode(this.srvGuruCookie.Authkey);
    const privateKey = CrazyKey.encode(this.srvGuruCookie.PrivateKey);
    const fpKey = CrazyKey.encode(this.srvGuruCookie.FingerPrint);
    return `${authKey}.${privateKey}.${fpKey}`;
  }
}
