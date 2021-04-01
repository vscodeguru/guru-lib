import { TemplateRef, ViewContainerRef } from '@angular/core';

export declare type GuruHeaderFooterPosition = 'above-fixed' | 'bellow-fixed' | 'bellow-static';
export declare type GuruSidebarPosition = 'start' | 'end';
export declare type GuruSidebarAction = 'open' | 'close' | 'toggle';
export declare type GuruSidebarMode = 'over' | 'push' | 'side';
export declare type GuruSidebarToggleResult = 'open' | 'close';


export class CardHelper {
  static removeContainer(container: ViewContainerRef): void {
    if (container && container.length > 0) {
      container.remove(0);
    }
  }


  static addContainer(container: ViewContainerRef, template: TemplateRef<any>): void {
    if (container && template) {
      container.insert(template.createEmbeddedView(null));
    }
  }
  static isValidObj(obj: any): boolean {
    return obj !== undefined && obj !== null;
  }
}
