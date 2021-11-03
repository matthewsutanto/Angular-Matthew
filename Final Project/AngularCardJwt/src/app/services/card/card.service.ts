import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Card } from 'src/app/modules/Card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  endpoint: string = 'http://localhost:5000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentCard: {
    paymentDetailsId: number;
    cardOwnerName: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
  } = {paymentDetailsId: -1, cardOwnerName:'', cardNumber:'', expirationDate:'', securityCode:''};

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    let api =   `${this.endpoint}/PaymentDetail`;

    return this.http
            .get(api)
            .pipe( catchError(this.handleError))
  }

  deleteCard(id:number):Observable<any> {
    let api = `${this.endpoint}/PaymentDetail/${id}`;
    return this.http
            .delete(api)
            .pipe( catchError(this.handleError))
  }

  newCard(card:Card): Observable<any> {
    let api =   `${this.endpoint}/PaymentDetail`;
    return this.http
            .post(api, card)
            .pipe( catchError(this.handleError))
  }

  updateCard(card:Card, PaymentDetailsId :number): Observable<any> {
    let api = `${this.endpoint}/PaymentDetail/${PaymentDetailsId}`;
    return this.http
            .put(api, card)
            .pipe( catchError(this.handleError))
  }

  getEmp(id:any): Observable<any> {
    let api = `${this.endpoint}/PaymentDetail/${id}`;
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
