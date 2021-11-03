import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Card } from 'src/app/modules/Card';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
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

  username: string ="";
  constructor(
    public authService: AuthService,
    public actRoute: ActivatedRoute
  ) { } 

  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser(){
    let username = this.actRoute.snapshot.paramMap.get('username');
    this.username = username!
    // console.log(localStorage.getItem('access_token'));
    // console.log(username)
  }

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
