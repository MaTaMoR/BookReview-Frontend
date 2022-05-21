import {Component} from '@angular/core';
import {AuthService} from 'src/app/auth/services/auth.service';
import {MatDialog} from "@angular/material/dialog";
import {SearchComponent} from "../search/search.component";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    constructor(private authService: AuthService, private dialog: MatDialog) {
    }

    busqueda(): void {

    }

    openDialog(): void {
        const dialogRef = this.dialog.open(SearchComponent, {
            autoFocus: false,
            width: '800px',
            height: 'auto',
            panelClass: 'trend-dialog',
            hasBackdrop: false,
            data: {search: "", categories: []}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
        });
    }
}
