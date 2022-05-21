import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthLoginRequest, AuthRegisterRequest} from '../interfaces/interfaces';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: []
})
export class AuthComponent {

    loginForm: FormGroup = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
    });

    registerForm: FormGroup = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        surnames: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]]
    })

    clicked: boolean = false;
    loading: boolean = false;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    }

    shouldShowError(value: string): boolean {
        return this.clicked && this.loginForm.controls[value].invalid;
    }

    getErrorMessage(value: string): string {
        if (this.shouldShowError(value)) {
            const entry = this.loginForm.controls[value];
            const errors = entry.errors;

            if (errors) {
                if (errors['required']) {
                    return `¡Debes rellenar este campo!`;
                } else if (errors['minlength']) {
                    return `¡El mínimo de caracteres es ${errors['minlength'].requiredLength}!`;
                } else if (errors['maxlength']) {
                    return `¡El máximo de caracteres es ${errors['maxlength'].requiredLength}!`;
                }
            }
        }

        return '';
    }

    login(): void {
        this.clicked = true;

        if (this.loginForm.valid) {
            const {username, password} = this.loginForm.value;
            const request: AuthLoginRequest = {
                username,
                password
            }

            this.loading = true;

            this.authService.login(request).subscribe(code => {
                this.loading = false;

                if (code == 200) {
                    this.router.navigateByUrl('/books');
                } else if (code == 400) {
                    Swal.fire('Error', '¡Usuario o contraseña incorrecta!', 'error');
                } else {
                    Swal.fire('Error', '¡Ha ocurrido un error al contactar con el servidor!', 'error');
                }
            });
        }
    }

    register(): void {
        this.clicked = true;

        if (this.registerForm.valid) {
            const {username, name, surnames, email, password} = this.registerForm.value;
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
                    this.router.navigateByUrl('/books');
                } else if (code == 400) {
                    Swal.fire('Error', '¡Un usuario con este username o email ya existe!', 'error');
                } else {
                    Swal.fire('Error', '¡Ha ocurrido un error al contactar con el servidor!', 'error');
                }
            });
        }
    }
}
