import { Component, Input, OnInit, ViewChild, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/modules/Card';
import { CardService } from 'src/app/services/card/card.service';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent implements OnInit {
  @Input() isUpdate:boolean=false;
  @Output() newUpdateTableEvent = new EventEmitter<any>();
  @Output() newUpdateCardEvent = new EventEmitter<Card>();
  @Output() newDeleteEvent = new EventEmitter<any>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  cards: Card[] =[];
  nameField:string = "Add New";
  isCurrentlyUpdate:boolean=false;
  closeResult = "";
  displayedColumns= ["cardOwnerName","cardNumber","expirationDate", "action"]

  dataSource = new MatTableDataSource<Card>(this.cards);
  
  constructor(public cardService: CardService, private modalService:NgbModal) {
    
  }

  ngOnInit(): void {
    this.getAllData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllData() {
    this.cardService
      .getAll()
      .subscribe(
        card => {
          this.dataSource.data = card
          this.dataSource.paginator = this.paginator
        });
    
  }

  ngDoCheck(){
    if(this.isUpdate){
      this.getAllData();
      this.isCurrentlyUpdate=false
      this.newUpdateTableEvent.emit();
    }
  }

  newUpdateCard(card:Card){
    this.isCurrentlyUpdate = true;
    this.newUpdateCardEvent.emit(card);
  }

  deleteCard(id:number, content:any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // console.log(this.employeeForm.value)
      this.cardService.deleteCard(id).subscribe((res) => {
        if(res) {
          alert("Success to delete a card")
          // console.log("berhasil delete");
          if(this.isCurrentlyUpdate) {
            this.newDeleteEvent.emit()
          }
          this.getAllData();
        }
      });
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
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
