import { Component } from '@angular/core';
import { Card } from './Modules/Card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularCardCRUD';
  signUpdate:boolean = false;
  signDelete:boolean = false;
  
  card:Card = {
    paymentDetailsId: -1,
    cardOwnerName: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: ""
  };

  updateTable() {
    this.signUpdate =  true;
    
  }

  updateTableFinish(){
    this.signUpdate = false;
    this.card={
      paymentDetailsId: -1,
      cardOwnerName: "",
      cardNumber: "",
      expirationDate: "",
      securityCode: ""
    };
  }

  updateCardEvent(id:Card) {
    this.card = id;
  }

  deleteCardEvent(){
    this.signDelete = true;
    this.signUpdate = false;
    console.log("hola")
  }

  finishDelete(){
    this.signDelete = false;
  }
}
