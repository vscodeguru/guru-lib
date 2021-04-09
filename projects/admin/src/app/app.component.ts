import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { LoadingService } from './core/service/loading.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'admin';
  constructor(
    private _loading: LoadingService
  ) { }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this._loading.hide();
  }
}
