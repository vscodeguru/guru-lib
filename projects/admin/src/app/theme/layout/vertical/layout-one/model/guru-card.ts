import { MatDrawerMode } from "@angular/material/sidenav";

export interface Sidebar {
  mode: 'over' | 'push' | 'side';
  position: 'start' | 'end';
  width: number;
  autoFocus?: boolean;
  disableClose?: boolean;
  opened?: boolean;
  responsive?: boolean;
}

export interface Topbar {

}

export interface Footer {

}
