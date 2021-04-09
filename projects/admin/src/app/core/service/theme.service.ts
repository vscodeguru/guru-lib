import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import _ from 'lodash';
import { ITheme } from '../model';
import { LazyLoadService } from './lazy-load.service';

@Injectable()
export class ThemeService {
  isLessLoaded = false;
  private _themeDefaults: ITheme = {
    Sidebar: {
      'layout-sider-background': { desc: 'Sidebar Backgroud', default: '#313483', ctrlType: 'color' },
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
  private genThemeVariables(them: ITheme): { [key: string]: string } {
    const vars: any = {};
    Object.keys(them?.Sidebar || {}).forEach(key => (vars[`@${key}`] = them.Sidebar[key].default));
    Object.keys(them?.header || {}).forEach(key => (vars[`@${key}`] = them.header[key].default));
    Object.keys(them?.footer || {}).forEach(key => (vars[`@${key}`] = them.footer[key].default));
    return vars;
  }
  constructor(
    private lazy: LazyLoadService,
    @Inject(DOCUMENT) private doc: any
  ) { }

  private loadLess(): Promise<void> {
    if (this.isLessLoaded) {
      return Promise.resolve();
    }
    return this.lazy
      .loadStyle('./assets/theme/menu.less', 'stylesheet/less')
      .then(() => {
        const lessConfigNode = this.doc.createElement('script');
        lessConfigNode.innerHTML = `
          window.less = {
            async: true,
            env: 'production',
            javascriptEnabled: true
          };
        `;
        this.doc.body.appendChild(lessConfigNode);
      })
      .then(() => this.lazy.loadScript('https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'))
      .then(() => {
        this.isLessLoaded = true;
      });
  }
  public registerTheme(them: ITheme | undefined): Promise<void> {
    const mergedTheme = _.merge(this._themeDefaults, them);
    return new Promise((resolve, reject) => {
      this.loadLess().then(() => {
        (window as any).less.modifyVars(this.genThemeVariables(mergedTheme)).then(() => { resolve(); });
      }).catch(() => { reject(); });
    });


  }
  public get themeDefaults(): ITheme { return Object.assign({}, this._themeDefaults); }
}
