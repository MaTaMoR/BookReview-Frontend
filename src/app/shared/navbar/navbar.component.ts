import {Component} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth.service';
import {MatDialog} from "@angular/material/dialog";
import {SidenavService} from "../services/sidenav.service";
import {SearchComponent} from "../search/search.component";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    constructor(private authService: AuthService, private dialog: MatDialog, private sidenavService: SidenavService) {

    }

    toggleSidenav() {
        this.sidenavService.toggle();
    }

    openSearch(): void {
        this.dialog.closeAll();
        this.dialog.open(SearchComponent, {
            autoFocus: true,
            width: '800px',
            height: 'auto',
            panelClass: 'trend-dialog'
        });
    }
}
