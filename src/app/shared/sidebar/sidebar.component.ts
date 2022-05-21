import {Component} from '@angular/core';
import {AuthService} from 'src/app/auth/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: []
})
export class SidebarComponent {

    constructor(public authService: AuthService) {
    }

}
