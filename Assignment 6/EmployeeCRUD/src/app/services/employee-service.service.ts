import { Injectable } from '@angular/core';
import { Employee } from '../Modules/Employee';
import { from, Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  endpoint: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentEmployee: {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
    confirmPassword : string;
  } = {id: 0,title:'', firstName:'', lastName:'', email: '', role: '', password: '', confirmPassword: ''};

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    let api =   `${this.endpoint}/users`;

    return this.http
            .get(api)
            .pipe( catchError(this.handleError))
  }

  deleteEmp(id:number):Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http
            .delete(api)
            .pipe( catchError(this.handleError))
  }

  newEmp(emp:Employee): Observable<any> {
    let api =   `${this.endpoint}/users`;
    return this.http
            .post(api, emp)
            .pipe( catchError(this.handleError))
  }

  updateEmp(emp:Employee, id:number): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http
            .put(api, emp)
            .pipe( catchError(this.handleError))
  }

  getEmp(id:any): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http.get(api, { headers: this.headers })
          .pipe(
            map((res: any) => {
              return res || {}
            }),
            catchError(this.handleError)
          )
  }

  handleError(error: HttpErrorResponse) {
    let msg ='';
    if(error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
