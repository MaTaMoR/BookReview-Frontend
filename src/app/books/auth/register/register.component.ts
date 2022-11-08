import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FormGroupHandler} from "../../../shared/utils/utils";
import Swal from "sweetalert2";
import {MatDialog} from "@angular/material/dialog";
import {AuthRegisterRequest} from "../../../shared/interfaces/interfaces";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends FormGroupHandler {

  loading: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog) {
    super(formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      surnames: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]]
    }))
  }

  register(): void {
    if (this.formGroup.valid) {
      const {username, name, surnames, email, password, confirmPassword} = this.formGroup.value;
      if (password != confirmPassword) {
        Swal.fire('¡Las contraseñas no coinciden!', '', 'error');
      } else {
        const request: AuthRegisterRequest = {
          username,
          name,
          surnames,
          email,
          password
        };

        this.loading = true;

        this.authService.register(request).subscribe(code => {
          this.loading = false;

          console.log(code);

          if (code == 200) {
            this.dialog.closeAll();
          } else if (code == 400) {
            Swal.fire('¡Un usuario con este username o email ya existe!', '', 'error');
          } else {
            Swal.fire('¡Ha ocurrido un error al contactar con el servidor!', '', 'error');
          }
        });
      }
    }
  }
}
