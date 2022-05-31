import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-sidenav-navbar',
  templateUrl: './sidenav-navbar.component.html',
  styleUrls: ['./sidenav-navbar.component.css']
})
export class SidenavNavbarComponent{

  constructor(private authService: AuthService) {}

  hasPrivilege(name: string) {
    return this.authService.hasPrivilege(name);
  }
}
