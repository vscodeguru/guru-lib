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
  headerPosition: GuruHeaderFooterPosition = 'below-static';
  footerPosition: GuruHeaderFooterPosition = 'below-static';
  showHeder = true;
  mlTheme: ITheme = {
    Sidebar: {
      'layout-sider-background': { desc: 'Sidebar Backgroud', default: '#0f172a' },
      'menu-item-color': { desc: 'Sidebar Backgroud', default: '#ec7070' },

      'menu-item-active-bg': { desc: 'Current Menu Backgroud', default: 'yellow' },
      'menu-item-active-color': { desc: 'Current Menu Backgroud', default: 'black' },


      'menu-item-highlight-bg': { desc: 'Hover Menu Backgroud', default: 'red' },
      'menu-item-highlight-color': { desc: 'Hover Menu Color', default: 'blue' }
    }
  }
  data: any = {};
  loadedLess = false;
  private get validSidebarKeys(): string[] {
    return Object.keys(this.mlTheme?.Sidebar || {});
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

      });
    });
  }
  private genVars(): any {
    const vars: any = {};
    this.validSidebarKeys.forEach(key => (vars[`@${key}`] = this.mlTheme.Sidebar[key].default));
    return vars;
  }
}

interface ITheme {
  Sidebar: { [key: string]: IStyle };
  header?: IStyle[];
  footer?: IStyle[];
}

interface IStyle {
  desc: string;
  default: string;
}
