import {Component, ViewChild} from '@angular/core';
import {filter, map, pipe, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {NavigationStart, Router, RouterEvent} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {SidenavService} from "./shared/services/sidenav.service";
import {ResizeService} from "./shared/services/resize.service";
import {MediaObserver} from "@angular/flex-layout";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild('drawer') private sidenav!: MatSidenav;

    loading: boolean = false;

    constructor(private router: Router, private matDialog: MatDialog, private sidenavService: SidenavService, private mediaObserver: MediaObserver) {
        setTimeout(() => {
            this.loading = false;
        }, 1000);

        // Close any opened dialog when route changes
        router.events.pipe(
            filter((event) => event instanceof NavigationStart),
            tap(() => matDialog.closeAll())
        ).subscribe();

        mediaObserver.asObservable().subscribe((event) => {
            event.forEach((entry) => {
                const newSize = entry.mqAlias;

                if (newSize == 'gt-sm') {
                    this.sidenav.close();
                }
            })
        })
    }

    ngAfterViewInit(): void {
        this.sidenavService.setSidenav(this.sidenav);
    }
}
