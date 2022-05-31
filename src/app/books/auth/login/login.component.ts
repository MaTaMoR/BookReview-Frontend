import {Component} from '@angular/core';
import {FormGroupHandler} from "../../../shared/utils/utils";
import {AuthService} from "../../../shared/services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthLoginRequest} from "../../../shared/interfaces/interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormGroupHandler {

  public loading: boolean = false;
  public clicked: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog) {
    super(formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
    }));
  }

  login(): void {
    this.clicked = true;

    if (this.formGroup.valid) {
      const {username, password} = this.formGroup.value;
      const request: AuthLoginRequest = {
        username,
        password
      }

      this.loading = true;

      this.authService.login(request).subscribe(code => {
        this.loading = false;

        if (code == 200) {
          this.dialog.closeAll();
        } else if (code == 400) {
          Swal.fire('Error', '¡Usuario o contraseña incorrecta!', 'error');
        } else {
          Swal.fire('Error', '¡Ha ocurrido un error al contactar con el servidor!', 'error');
        }
      });
    }
  }
}
