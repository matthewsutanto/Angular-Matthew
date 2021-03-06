import { Injectable } from '@angular/core';
import { User } from 'src/app/modules/User';
import { from, Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://final-project-matthew.herokuapp.com/api/AuthManagement';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: {
    username: string,
    email: string
  } = {username: '', email: ''};
  email:any="";

  constructor(private http: HttpClient, private router:Router) { }

  signUp(user:User) {
    let api =   `${this.endpoint}/Register`;
    return this.http
            .post(api, user)
            .subscribe((res: any) => {
                // console.log(res);
                alert("Silahkan login untuk ke menu card management")
                this.router.navigate(['login']);
             },
                err=> {
                  // alert("Invalid Login Request")
                  alert(err.error.errors)
                }
             )
  }

  signIn(user:User) {
   const api = `${this.endpoint}/Login`;
  //  console.log("Masuk sini")

   return this.http
   .post(api, user)
   .subscribe((res: any) => {
    sessionStorage.setItem('access_token', res[1].token)
      this.currentUser = user;
      // console.log(sessionStorage.getItem('access_token'));
      
      this.email = this.currentUser.email
      alert("Hello "+this.email+" go to Homepage")
      this.router.navigate(['home/'+this.email]);
   },
      err=> {
        alert("Invalid Login Request")
      }
   )
  //  .pipe( catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let msg ='';
    if(error.error instanceof ErrorEvent) {
      msg = error.error.message;
      alert(msg);
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(msg);
  }

  // getUserProfile(id:any): Observable<any> {
  //   let api = `${this.endpoint}/user-profile/${id}`;
  //   return this.http.get(api, { headers: this.headers })
  //         .pipe(
  //           map((res: any) => {
  //             return res || {}
  //           }),
  //           catchError(this.handleError)
  //         )
  // }

  logout(){
    sessionStorage.removeItem('access_token');
    alert("Terima kasih")
    this.router.navigate(['login']);
  }

  

  getToken() {
    return sessionStorage.getItem('access_token');
  }
}
