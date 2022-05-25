import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthUser} from "../../interfaces/interfaces";
import {AuthComponent} from "../../auth/auth.component";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent {

    constructor(private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar, private themeService: ThemeService) { }

    isLogged(): boolean {
        return this.authService.isLogged();
    }

    isDarkTheme(): boolean {
        return this.themeService.darkTheme;
    }

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    getProfile(): AuthUser {
        return this.authService.getCurrentUser();
    }

    logout(): void {
        this.authService.logout();
        this.snackBar.open('¡Sesión cerrada!', 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 2500
        });
    }

    openAuth(tab: string): void {
        this.dialog.open(AuthComponent, {
            autoFocus: true,
            height: 'auto',
            panelClass: 'trend-dialog',
            data: {tab: tab}
        });
    }
}
