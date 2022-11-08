import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthUser} from "../../../shared/interfaces/interfaces";
import {UploadComponent} from "../../../shared/components/upload/upload.component";
import {FormBuilder, Validators} from "@angular/forms";
import {FormGroupHandler} from "../../../shared/utils/utils";
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends FormGroupHandler {

  loading: boolean = false;

  constructor(private authService: AuthService, private dialog: MatDialog, private formBuilder: FormBuilder) {
    super(formBuilder.group({
      name: [authService.currentUser.name, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      surnames: [authService.currentUser.surnames, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      password: ['', [Validators.minLength(3), Validators.maxLength(32)]],
      confirmPassword: ['', [Validators.minLength(3), Validators.maxLength(32)]]
    }));
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  getProfile(): AuthUser {
    return this.authService.currentUser;
  }

  openUpload(): void {
    this.dialog.open(UploadComponent, {
      autoFocus: true,
      panelClass: 'trend-dialog'
    }).afterClosed().subscribe((result) => {
      if (result) {
        const newUser: AuthUser = {...this.authService.currentUser};
        newUser.image = result;

        this.authService.updateUser(newUser).subscribe();
      }
    });
  }

  updateProfile(): void {
    if (this.formGroup.valid && !this.formGroup.touched) {
      Swal.fire('¡Realiza un cambio primero!', '', 'error');
    } else if (this.formGroup.valid && !this.loading) {
      this.loading = true;

      const name = this.getValue('name');
      const surnames = this.getValue('surnames');
      const password = this.getValue('password');
      const confirmPassword = this.getValue('confirmPassword');

      if (password == confirmPassword) {
        const newUser: AuthUser = {...this.authService.currentUser};
        newUser.name = name;
        newUser.surnames = surnames;

        if (password) {
          newUser.password = password;
        }

        this.authService.updateUser(newUser).subscribe(() => {
          this.loading = false;
          Swal.fire('¡Información actualizada!', '', 'success');
        });
      } else {
        Swal.fire('¡La contraseña no coincide!', '', 'error');
      }
    }
  }
}
