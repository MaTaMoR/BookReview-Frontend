import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AuthData} from "../interfaces/interfaces";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: []
})
export class AuthComponent {

  defaultTab: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AuthData) {
    this.defaultTab = (data.tab ? data.tab : 'login');
  }

  tabIndex(): number {
    return this.defaultTab == 'login' ? 0 : 1;
  }
}
