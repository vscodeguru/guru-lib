import { AfterContentInit, AfterViewInit, ViewContainerRef } from '@angular/core';
import { ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CardHelper } from '../../helper/card.helper';
import { GuruHeaderComponent } from '../header';
import { GuruContentComponent } from '../content';
import { GuruFooterComponent } from '../footer';
import { GuruSidebarLeftComponent, GuruSidebarRightComponent } from '../sidebar';


@UntilDestroy()
@Component({
  selector: 'guru-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class GuruCardComponent implements AfterContentInit, AfterViewInit {

  public cardMode: 'card' | 'left-with-card' | 'right-with-card' | 'left-right-with-card' = 'card';

  @ContentChild(GuruHeaderComponent) public guruHeader!: GuruHeaderComponent;
  @ContentChild(GuruFooterComponent) public guruFooter!: GuruFooterComponent;
  @ContentChild(GuruContentComponent) public guruContent!: GuruContentComponent;
  @ContentChild(GuruSidebarLeftComponent) public guruSidebarLeft!: GuruSidebarLeftComponent;
  @ContentChild(GuruSidebarRightComponent) public guruSidebarRight!: GuruSidebarRightComponent;

  @ViewChild('vcAboveHeader', { read: ViewContainerRef }) vcAboveHeader!: ViewContainerRef;
  @ViewChild('vcAboveFooter', { read: ViewContainerRef }) vcAboveFooter!: ViewContainerRef;
  @ViewChild('vcContent', { read: ViewContainerRef }) vcContent!: ViewContainerRef;

  @ViewChild('vcFixedHeader', { read: ViewContainerRef }) vcFixedHeader!: ViewContainerRef;
  @ViewChild('vcFixedFooter', { read: ViewContainerRef }) vcFixedFooter!: ViewContainerRef;


  @ViewChild('header') tmplHeader!: TemplateRef<any>;
  @ViewChild('content') tmplContent!: TemplateRef<any>;
  @ViewChild('footer') tmplFooter!: TemplateRef<any>;
  @ViewChild('matNavLeft', { static: false }) private MatNavLeft!: MatSidenav;
  @ViewChild('matNavRight', { static: false }) private MatNavRight!: MatSidenav;

  constructor() { }
  ngAfterContentInit(): void {
    // ! Card View Mode
    if (this.guruSidebarRight && this.guruSidebarLeft) {
      this.cardMode = 'left-right-with-card';
    } else if (this.guruSidebarLeft) {
      this.cardMode = 'left-with-card';
    } else if (this.guruSidebarRight) {
      this.cardMode = 'right-with-card';
    } else {
      this.cardMode = 'card';
    }
    // ! Wait & bind mat-nav with guru-sidebar
    setTimeout(() => {
      if (this.guruSidebarLeft) {
        this.guruSidebarLeft.bind(this.MatNavLeft);
      }
      if (this.guruSidebarRight) {
        this.guruSidebarRight.bind(this.MatNavRight);
      }
    });
  }
  ngAfterViewInit(): void {
    // ! Add Header & Footer Handlers Only in AfterContentInit Event
    // ! Add Content View Only AfterViewInit Event
    this._headerHandler();
    CardHelper.addContainer(this.vcContent, this.tmplContent);
    this._footerHandler();
  }

  private _headerHandler(): void {
    if (this.guruHeader) {
      // tslint:disable-next-line: deprecation
      this.guruHeader._positionChanges.pipe(untilDestroyed(this)).subscribe(
        {
          next: (position) => {
            // ! 1. Remove Above Header
            CardHelper.removeContainer(this.vcAboveHeader);
            // ! 2. Remove Fixed Header
            CardHelper.removeContainer(this.vcFixedHeader);
            // ! 3. Remove Static Header
            CardHelper.removeContainer(this.guruContent.vcStaticHeader);
            // ! 4. Add View To Corresponding Header Container
            switch (position) {
              case 'above-fixed':
                CardHelper.addContainer(this.vcAboveHeader, this.tmplHeader);
                break;
              case 'below-fixed':
                CardHelper.addContainer(this.vcFixedHeader, this.tmplHeader);
                break;
              case 'below-static':
                CardHelper.addContainer(this.guruContent.vcStaticHeader, this.tmplHeader);
                break;
            }
          }
        }
      );
    }
  }
  private _footerHandler(): void {
    if (this.guruFooter) {
      // tslint:disable-next-line: deprecation
      this.guruFooter._positionChanges.pipe(untilDestroyed(this)).subscribe(
        {
          next: (position) => {
            // ! 1. Remove Above Footer
            CardHelper.removeContainer(this.vcAboveFooter);
            // ! 2. Remove Fixed Footer
            CardHelper.removeContainer(this.vcFixedFooter);
            // ! 3. Remove Static Footer
            CardHelper.removeContainer(this.guruContent.vcStaticFooter);
            // ! 4. Create View From Footer Template
            switch (position) {
              case 'above-fixed':
                CardHelper.addContainer(this.vcAboveFooter, this.tmplFooter);
                break;
              case 'below-fixed':
                CardHelper.addContainer(this.vcFixedFooter, this.tmplFooter);
                break;
              case 'below-static':
                CardHelper.addContainer(this.guruContent.vcStaticFooter, this.tmplFooter);
                break;
            }
          }
        }
      );
    }
  }
}
