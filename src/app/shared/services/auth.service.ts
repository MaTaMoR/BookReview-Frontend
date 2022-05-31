import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, switchMap, tap} from 'rxjs';
import {environment} from 'src/environments/environment';
import {AuthLoginRequest, AuthRegisterRequest, AuthResponse, AuthUser} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  private baseUrl: string = environment.baseUrl;

  private currentUser: AuthUser | null = null;
  private token: string | null = null;

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

  private static handleError(error: HttpErrorResponse) {
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

  isLogged(): boolean {
    return this.currentUser != null;
  }

  getCurrentUser(): AuthUser {
    return this.currentUser!;
  }

  logout() {
    localStorage.removeItem('token');

    this.token = null;
    this.currentUser = null;
  }

  login(request: AuthLoginRequest): Observable<number> {
    const url = `${this.baseUrl}/auth/login`;

    return this.http.post<AuthResponse>(url, request)
      .pipe(
        switchMap(e => {
          return this.loadUserData(e.token);
        }),
        catchError(AuthService.handleError)
      )
  }

  register(request: AuthRegisterRequest): Observable<number> {
    const url = `${this.baseUrl}/auth/register`;

    return this.http.post<AuthResponse>(url, request)
      .pipe(
        switchMap(e => {
          return this.loadUserData(e.token);
        }),
        catchError(AuthService.handleError)
      );
  }

  hasRole(name: string): boolean {
    if (this.currentUser) {
      for (let role of this.currentUser.roles) {
        if (role.name == name) {
          return true;
        }
      }
    }

    return false;
  }

  hasPrivilege(name: string): boolean {
    if (this.currentUser) {
      for (let role of this.currentUser.roles) {
        for (let privilege of role.privileges) {
          if (privilege.name == name) {
            return true;
          }
        }
      }
    }

    return false;
  }

  private loadUserData(token: string): Observable<number> {
    const url = `${this.baseUrl}/auth/validate`;

    return this.http.post<AuthUser>(url, token)
      .pipe(
        tap((response) => {
          this.token = token;
          this.currentUser = response;

          localStorage.setItem('token', token);
        }),
        map(e => 200),
        catchError(AuthService.handleError)
      );
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: this.token
        }
      });
    }

    return next.handle(request);
  }
}
