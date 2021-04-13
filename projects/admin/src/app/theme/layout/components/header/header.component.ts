import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'projects/admin/src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class MatrixHeaderComponent implements OnInit {

  constructor(private srvTheme: ThemeService) { }

  ngOnInit(): void {
  }
  toggleSidebar(): void {
    this.srvTheme.toggle('left');
  }
}
