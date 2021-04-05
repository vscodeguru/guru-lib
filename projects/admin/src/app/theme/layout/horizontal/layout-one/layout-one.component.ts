import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'horizontal-layout-one',
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalLayoutOneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
