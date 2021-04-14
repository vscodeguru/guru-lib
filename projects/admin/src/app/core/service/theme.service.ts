import { Injectable } from '@angular/core';
import _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITheme } from '../model';

@Injectable()
export class ThemeService {
  isLessLoaded = false;
  private _themeDefaults: ITheme = {
    sidebar: {
      'layout-sider-background': { desc: 'Sidebar Backgroud', default: '#313483', ctrlType: 'color' },
      'layout-sider-width': { desc: 'Sidebar Width', default: '250px', ctrlType: 'text' },
      'menu-item-color': { desc: 'Sidebar Item Color', default: '#f8fafc', ctrlType: 'color' },
      'menu-item-active-bg': { desc: 'Current Menu Backgroud', default: 'hsla(0,0,100,0.12)', ctrlType: 'color' },
      'menu-item-active-color': { desc: 'Current Menu Backgroud', default: '#f8fafc', ctrlType: 'color' },
      'menu-item-highlight-bg': { desc: 'Hover Menu Backgroud', default: 'hsla(0,0,100,0.06)', ctrlType: 'color' },
      'menu-item-highlight-color': { desc: 'Hover Menu Color', default: '#f8fafc', ctrlType: 'color' },
      'layout-sider-box-shadow': { desc: 'Menu Box Shadow', default: '3px 0px 5px 0px rgba(158, 158, 158, 0.66)', ctrlType: 'text' }
    },
    header: {
      'layout-header-background': { desc: 'Header Backgroud', default: '#f0f0f0', ctrlType: 'color' },
      'layout-header-height': { desc: 'Header Height', default: '50px', ctrlType: 'text' },
      'layout-header-padding': { desc: 'Header Padding', default: '0 0px', ctrlType: 'text' },
      'layout-header-color': { desc: 'Header Color', default: '#313483', ctrlType: 'color' },
      'layout-header-border-color': { desc: 'Header border Color', default: '#f0f0f0', ctrlType: 'color' },
      'layout-header-box-shadow': { desc: 'Header Box Shadow', default: '0px 2px 5px 0px rgba(0, 0, 0, 0.30)', ctrlType: 'text' },
      'layout-header-position': {
        desc: 'Header Position', default: 'below-fixed', ctrlType: 'option',
        options: [
          { text: 'Above Fixed', value: 'above-fixed' },
          { text: 'Below Static', value: 'below-static' },
          { text: 'Below Fixed', value: 'below-fixed' }
        ]
      }
    },
    footer: {
      'layout-footer-background': { desc: 'Footer Backgroud', default: '#f0f0f0', ctrlType: 'color' },
      'layout-footer-height': { desc: 'Footer Height', default: '50px', ctrlType: 'text' },
      'layout-footer-padding': { desc: 'Footer Padding', default: '0 24px', ctrlType: 'text' },
      'layout-footer-color': { desc: 'Footer Color', default: '#313483', ctrlType: 'color' },
      'layout-footer-border-color': { desc: 'Footer border Color', default: '#f0f0f0', ctrlType: 'color' },
      'layout-footer-box-shadow': { desc: 'Footer Box Shadow', default: '2px 0px 5px 0px rgba(0, 0, 0, 0.30)', ctrlType: 'text' },
      'layout-footer-position': {
        desc: 'Footer Position', default: 'below-fixed', ctrlType: 'option',
        options: [
          { text: 'Above Fixed', value: 'above-fixed' },
          { text: 'Below Static', value: 'below-static' },
          { text: 'Below Fixed', value: 'below-fixed' }
        ]
      }
    }
  };
  private _toggleChanged: BehaviorSubject<'left' | 'right' | undefined> = new BehaviorSubject<'left' | 'right' | undefined>(undefined);
  public toggleChanged = this._toggleChanged.asObservable();

  private _themeRegistered = new BehaviorSubject<ITheme | undefined>(Object.assign({}, this._themeDefaults));
  public get themeRegistered(): Observable<ITheme | undefined> { return this._themeRegistered.asObservable(); }

  private _genThemeVariables(them: ITheme): { [key: string]: string } {
    const vars: any = {};
    Object.keys(them?.sidebar || {}).forEach(key => (vars[`@${key}`] = them.sidebar[key].default));
    Object.keys(them?.header || {}).forEach(key => (vars[`@${key}`] = them.header[key].default));
    Object.keys(them?.footer || {}).forEach(key => (vars[`@${key}`] = them.footer[key].default));
    return vars;
  }
  constructor() { }

  // public get themeDefaults(): ITheme { return Object.assign({}, this._themeDefaults); }
  public registerTheme(them: ITheme | undefined): Observable<ITheme | undefined> {
    const mergedTheme = _.merge(this._themeDefaults, them);
    return new Observable((observer) => {
      try {
        (window as any).less.modifyVars(this._genThemeVariables(mergedTheme)).then(() => {
          this._themeRegistered.next(mergedTheme);
          return observer.next(mergedTheme);
        }).catch((err: any) => { observer.error(err); });
      } catch (error) {
        console.log(error);
      }
    });
  }
  public toggle(nav: 'left' | 'right' | undefined): void {
    this._toggleChanged.next(nav);
  }
}
