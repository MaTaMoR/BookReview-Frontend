import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthUser} from "../../../shared/interfaces/interfaces";
import {AuthComponent} from "../../auth/auth.component";
import {ThemeService} from "../../../shared/services/theme.service";
import {ProfileComponent} from "../profile/profile.component";

@Component({
  selector: 'app-profile-navbar',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.css']
})
export class NavbarProfileComponent {

  constructor(private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar, private themeService: ThemeService) {
  }

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
    return this.authService.currentUser;
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

  openProfile(): void {
    this.dialog.closeAll()
    this.dialog.open(ProfileComponent, {
      autoFocus: true,
      height: 'auto',
      width: 'auto',
      panelClass: 'trend-dialog'
    });
  }
}
