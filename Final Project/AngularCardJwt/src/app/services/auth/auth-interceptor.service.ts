import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService, public router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log("halo ini intercept")
    const authToken = this.authService.getToken();
    req = req.clone({
          setHeaders: {
            Authorization: "Bearer "+authToken
          }
    });

    return next.handle(req).pipe(
      tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
  
        }
      }, (err:any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect to the login route
            // or show a modal
            sessionStorage.removeItem('access_token');
            window.alert("Access not allowed");
            this.router.navigate(['login'])
            // console.log("You unauthorized user")
          }
        }
      }
    ));
  }
}
