import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, switchMap, tap} from 'rxjs';
import {environment} from 'src/environments/environment';
import {
    AuthLoginRequest,
    AuthRegisterRequest,
    AuthResponse,
    AuthUser,
    AuthUserResponse
} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl: string = environment.baseUrl;
    private currentUser: AuthUser | undefined;

    constructor(private http: HttpClient) {
        const token = localStorage.getItem('token');
        if (token != null) {
            this.loadUserData(token).subscribe((result) => {
                if (result != 200) {
                    localStorage.removeItem('token');
                }
            });
        }
    }

    isLogged(): boolean {
        return !(typeof this.currentUser === 'undefined');
    }

    getCurrentUser(): AuthUser {
        return this.currentUser!;
    }

    login(request: AuthLoginRequest): Observable<number> {
        const url = `${this.baseUrl}/auth/login`;

        return this.http.post<AuthResponse>(url, request)
            .pipe(
                switchMap(e => {
                    return this.loadUserData(e.token);
                }),
                catchError(this.handleError)
            )
    }

    register(request: AuthRegisterRequest): Observable<number> {
        const url = `${this.baseUrl}/auth/register`;

        return this.http.post<AuthResponse>(url, request)
            .pipe(
                switchMap(e => {
                    return this.loadUserData(e.token);
                }),
                catchError(this.handleError)
            );
    }

    private loadUserData(token: string): Observable<number> {
        const url = `${this.baseUrl}/auth/validate`;

        return this.http.post<AuthUserResponse>(url, token)
            .pipe(
                tap((response) => {
                    this.currentUser = {
                        username: response.username,
                        name: response.name,
                        surnames: response.surnames,
                        email: response.email,
                        token: token
                    };

                    localStorage.setItem('token', token);
                }),
                map(e => 200),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return of(error.status);
    }
}
