import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GuruHeaderFooterPosition } from '@guru/card';
import { LazyService } from '../../../service/LazyService';

@Component({
  selector: 'vertical-layout-one',
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayoutOneComponent implements OnInit {
  headerPosition: GuruHeaderFooterPosition = 'below-fixed';
  footerPosition: GuruHeaderFooterPosition = 'below-static';
  showHeder = true;
  mlTheme: ITheme = {
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
        optValues: [
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
        optValues: [
          { text: 'Above Fixed', value: 'above-fixed' },
          { text: 'Below Static', value: 'below-static' },
          { text: 'Below Fixed', value: 'below-fixed' }
        ]
      }
    }
  };
  data: any = {};
  loadedLess = false;
  public get validSidebarKeys(): string[] {
    return Object.keys(this.mlTheme?.Sidebar || {});
  }
  public get validHeaderKeys(): string[] {
    return Object.keys(this.mlTheme?.header || {});
  }
  public get validFooterKeys(): string[] {
    return Object.keys(this.mlTheme?.footer || {});
  }
  constructor(
    private lazy: LazyService,
    @Inject(DOCUMENT) private doc: any
  ) { }
  ngOnInit(): void {
    this.runLess();
  }


  counter(i: number): Array<number> {
    return new Array(i);
  }

  log(msg: string): void {
    console.log(msg);
  }
  preview(): void {
    this.runLess();
  }
  private async loadLess(): Promise<void> {
    if (this.loadedLess) {
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
        this.loadedLess = true;
      });
  }
  private runLess(): void {
    this.loadLess().then(() => {
      (window as any).less.modifyVars(this.genVars()).then(() => {
        this.headerPosition = this.mlTheme.header['layout-header-position'].default as any;
        this.footerPosition = this.mlTheme.footer['layout-footer-position'].default as any;
      });
    });
  }
  private genVars(): any {
    const vars: any = {};
    this.validSidebarKeys.forEach(key => (vars[`@${key}`] = this.mlTheme.Sidebar[key].default));
    this.validHeaderKeys.forEach(key => (vars[`@${key}`] = this.mlTheme.header[key].default));
    this.validFooterKeys.forEach(key => (vars[`@${key}`] = this.mlTheme.footer[key].default));
    return vars;
  }
}

interface ITheme {
  Sidebar: { [key: string]: IStyle };
  header: { [key: string]: IStyle };
  footer: { [key: string]: IStyle };
}

interface IStyle {
  desc: string;
  default: string;
  ctrlType?: 'color' | 'text' | 'option';
  optValues?: IOptValue[];
}
interface IOptValue {
  text: string;
  value: string;
}
