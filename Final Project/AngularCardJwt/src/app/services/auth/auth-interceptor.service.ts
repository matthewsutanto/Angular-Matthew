import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("halo ini intercept")
    const authToken = this.authService.getToken();
    req = req.clone({
          setHeaders: {
            Authorization: "Bearer "+authToken
          }
    });

    return next.handle(req);
  }
}
