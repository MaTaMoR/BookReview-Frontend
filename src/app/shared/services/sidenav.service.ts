import {Injectable} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private sidenav!: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open(): void {
    if (this.sidenav) {
      this.sidenav.open();
    }
  }

  public close(): void {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  public toggle(): void {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
}
