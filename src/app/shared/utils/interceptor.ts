import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
    console.log('interceptor');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token) {
      request = request.clone({
        setHeaders: {
          Authorization: this.authService.token
        }
      });
    }

    return next.handle(request);
  }
}
