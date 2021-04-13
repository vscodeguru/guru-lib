import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, finalize } from 'rxjs/operators';
@Injectable()
export class LoaderService implements HttpInterceptor {

  private count = 0;

  splashScreenEl: any;
  player!: AnimationPlayer;

  constructor(
    private _animationBuilder: AnimationBuilder,
    @Inject(DOCUMENT) private _document: any,
    private _router: Router
  ) {
    this._init();
  }


  /**
   * Initialize
   */
  private _init(): void {// Get the splash screen element
    this.splashScreenEl = this._document.body.querySelector('#splash-screen-guru');
    // If the splash screen element exists...
    if (this.splashScreenEl) {
      // Hide it on the first NavigationEnd event
      this._router.events
        .pipe(
          filter((event => event instanceof NavigationEnd)),
          take(1)
        )
        // tslint:disable-next-line: deprecation
        .subscribe(
          () => {
            setTimeout(() => {
              this.hide();
            });
          }
        );
    }
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.count === 0) {
      this.show();
    }
    this.count++;
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.hide();
        }
      }));
  }
  /**
   *  Show the splash screen
   */
  show(): void {
    this.player =
      this._animationBuilder
        .build([
          style({
            opacity: '0',
            zIndex: '99999'
          }),
          animate('400ms ease', style({ opacity: '1' }))
        ]).create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }
  /**
   * Hide the splash screen
   */
  hide(): void {
    this.player =
      this._animationBuilder
        .build([
          style({ opacity: '1' }),
          animate('400ms ease', style({
            opacity: '0',
            zIndex: '-10'
          }))
        ]).create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }
}
