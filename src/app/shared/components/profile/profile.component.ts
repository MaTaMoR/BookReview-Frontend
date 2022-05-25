import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthUser} from "../../interfaces/interfaces";
import {AuthComponent} from "../../auth/auth.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

    constructor(private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

    isLogged(): boolean {
      return this.authService.isLogged();
    }

    getProfile(): AuthUser {
        return this.authService.getCurrentUser();
    }

    logout(): void {
        this.authService.logout();
        this.snackBar.open('¡Sesión cerrada!', 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    }

    openAuth(tab: string): void {
        this.dialog.closeAll()
        this.dialog.open(AuthComponent, {
            autoFocus: true,
            height: 'auto',
            panelClass: 'trend-dialog',
            data: {tab: tab}
        });
    }
}
