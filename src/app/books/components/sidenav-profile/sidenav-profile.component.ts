import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthUser} from "../../../shared/interfaces/interfaces";
import {AuthComponent} from "../../auth/auth.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ThemeService} from "../../../shared/services/theme.service";
import {ProfileComponent} from "../profile/profile.component";

@Component({
  selector: 'app-sidenav-profile',
  templateUrl: './sidenav-profile.component.html',
  styleUrls: ['./sidenav-profile.component.css']
})
export class SidenavProfileComponent {

  constructor(private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar, private themeService: ThemeService) { }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  getProfile(): AuthUser {
    return this.authService.currentUser;
  }

  isDarkTheme(): boolean {
    return this.themeService.darkTheme;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
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
    this.dialog.closeAll()
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
      width: '50',
      panelClass: 'trend-dialog'
    });
  }
}
