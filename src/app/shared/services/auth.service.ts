import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {catchError, map, Observable, of, switchMap, tap} from 'rxjs';
import {environment} from 'src/environments/environment';
import {AuthLoginRequest, AuthRegisterRequest, AuthResponse, AuthUser} from '../interfaces/interfaces';

@Injectable({providedIn: "root"})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  private _currentUser: AuthUser | null = null;
  private _token: string | null = null;

  constructor(private http: HttpClient) { }

  loadToken() {
    const token = localStorage.getItem('token');
    if (token != null) {
      this.loadUserData(token).subscribe((result) => {
        if (result == 401) { //El token no es válido, lo borramos
          localStorage.removeItem('token');
        }
      });
    }
  }

  isLogged(): boolean {
    return this._currentUser != null;
  }

  get currentUser(): AuthUser {
    return this._currentUser!;
  }

  get token(): string {
    return this._token!;
  }

  logout() {
    localStorage.removeItem('token');

    this._token = null;
    this._currentUser = null;
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

  updateUser(user: AuthUser): Observable<number> {
    if (this._currentUser == null) {
      throw new Error('User not logged!');
    }

    const url = `${this.baseUrl}/auth/update`;

    return this.http.post<AuthUser>(url, user)
      .pipe(
        tap((resp) => {
          this._currentUser = resp;
        }),
        map(() => 200),
        catchError(this.handleError)
    );
  }

  hasRole(name: string): boolean {
    if (this._currentUser) {
      for (let role of this._currentUser.roles) {
        if (role.name == name) {
          return true;
        }
      }
    }

    return false;
  }

  hasPrivilege(name: string): boolean {
    if (this._currentUser) {
      for (let role of this._currentUser.roles) {
        for (let privilege of role.privileges) {
          if (privilege.name == name) {
            return true;
          }
        }
      }
    }

    return false;
  }

  loadUserData(token: string): Observable<number> {
    const url = `${this.baseUrl}/auth/validate`;

    console.log('load user: ' + token);
    console.log(url);

    return this.http.post<AuthUser>(url, token)
      .pipe(
        tap((response) => {
          this._token = token;
          this._currentUser = response;

          console.log('DATA LOADED');

          localStorage.setItem('token', token);
        }),
        map(() => 200),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }

    console.log(error);
    // Return an observable with a user-facing error message.
    return of(error.status);
  }
}
