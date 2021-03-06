import { Component, OnInit, Output, SimpleChange, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Card } from 'src/app/Modules/Card';
import { CardService } from 'src/app/services/card.service';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.css']
})
export class FormCardComponent implements OnInit {

  @Output() newCardEvent = new EventEmitter<any>();
  @Output() newFinishDeleteEvent = new EventEmitter<any>();

  @Input() updateCard: Card = {
    paymentDetailsId: -1,
    cardOwnerName: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: ""
  }

  @Input()isDelete: boolean = false;
  closeResult = "";
  cardInput = {
    "paymentDetailsId": 0,
    "cardOwnerName": "",
    "cardNumber": "",
    "expirationDate": "",
    "securityCode": ""
  }

  isUpdate: boolean = false;
  idCardUpdate: number = -1;
  btnName: string = "Add New Card";

  constructor(public cardService: CardService, private modalService:NgbModal) { }

  cardForm = new FormGroup({
    cardOwnerName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
      Validators.minLength(3)
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(16),
      Validators.maxLength(16)
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(3),
      Validators.maxLength(3)
    ]),
    expirationDate: new FormControl('', [
      Validators.required
    ])
  })

  ngOnInit(): void {
  }

  get cardOwnerName() {
    return this.cardForm.get("cardOwnerName")
  }

  get cardNumber() {
    return this.cardForm.get("cardNumber")
  }

  get securityCode() {
    return this.cardForm.get("securityCode")
  }

  get expirationDate() {
    return this.cardForm.get("expirationDate")
  }

  inputCard(content:any) {
    if (this.cardForm.valid) {
      console.log(this.cardForm.value)
      console.log(this.isUpdate)
      
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        // console.log(this.employeeForm.value)
        if (!this.isUpdate) {
          this.cardInput = {
            "paymentDetailsId": 0,
            "cardOwnerName": this.cardOwnerName?.value,
            "cardNumber": this.cardNumber?.value,
            "expirationDate": this.expirationDate?.value,
            "securityCode": this.securityCode?.value
          }
          this.cardService.newCard(this.cardInput).subscribe((res) => {
            if (res) {
              this.cardForm.reset();
              console.log("berhasil")
              this.newCardEvent.emit();
            }
          })
        } else {
          console.log(this.idCardUpdate);
          this.cardInput = {
            "paymentDetailsId": this.idCardUpdate,
            "cardOwnerName": this.cardOwnerName?.value,
            "cardNumber": this.cardNumber?.value,
            "expirationDate": this.expirationDate?.value,
            "securityCode": this.securityCode?.value
          }
          console.log(this.cardInput)
          this.cardService.updateCard(this.cardInput, this.idCardUpdate).subscribe((res) => {
            if (res) {
              this.cardForm.reset();
              console.log("berhasil update")
              this.newCardEvent.emit();
              this.idCardUpdate = -1;
              this.isUpdate = false;
              this.btnName = "Add Employee";
              this.cardForm.reset();
            }
          });
        }
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });  

      this.cardInput = {
        "paymentDetailsId": 0,
        "cardOwnerName": "",
        "cardNumber": "",
        "expirationDate": "",
        "securityCode": ""
      }
    }
  }

  ngDoCheck() {
    if (this.updateCard.paymentDetailsId != -1) {
      this.updateForm()

      this.updateCard = {
        paymentDetailsId: -1,
        cardOwnerName: "",
        cardNumber: "",
        expirationDate: "",
        securityCode: ""
      };
    }

    if(this.isDelete) {
      this.idCardUpdate = -1;
      this.isUpdate = false;
      this.btnName = "Add Employee";
      this.cardForm.reset();
      this.newFinishDeleteEvent.emit();
      // this.isDelete=false;
    }
  }

  updateForm() {
    this.cardOwnerName?.setValue(this.updateCard.cardOwnerName);
    this.cardNumber?.setValue(this.updateCard.cardNumber);
    this.securityCode?.setValue(this.updateCard.securityCode);
    this.expirationDate?.setValue(this.updateCard.expirationDate);
    this.btnName = "Update Card";
    this.isUpdate = true;
    this.idCardUpdate = this.updateCard.paymentDetailsId;
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
