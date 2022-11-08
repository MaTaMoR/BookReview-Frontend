import {Component, OnInit, ViewChild} from '@angular/core';
import {filter, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {NavigationStart, Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {SidenavService} from "./shared/services/sidenav.service";
import {MediaObserver} from "@angular/flex-layout";
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private matDialog: MatDialog, private sidenavService: SidenavService, private mediaObserver: MediaObserver, private authService: AuthService) { }

  ngOnInit(): void {
    //Load auth service token
    this.authService.loadToken();

    // Close any opened dialog when route changes
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart),
      tap(() => this.matDialog.closeAll())
    ).subscribe();

    // Cerrar el sidenav cuando el tamaño de la pantalla cambia
    this.mediaObserver.asObservable().subscribe((event) => {
      event.forEach((entry) => {
        const newSize = entry.mqAlias;

        if (newSize == 'gt-sm') {
          this.sidenavService.close();
        }
      })
    })
  }
}
