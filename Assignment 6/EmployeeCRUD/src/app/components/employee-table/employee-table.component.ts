import { Component, Input, OnInit, SimpleChange, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Modules/Employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  @Input() isUpdate:boolean=false;
  @Output() newUpdateTableEvent = new EventEmitter<any>();
  @Output() newUpdateEmpEvent = new EventEmitter<Employee>();
  @Output() newDeleteEvent = new EventEmitter<any>();
  
  employees:Employee[] = []; 
  nameField:string = "Add New";
  isCurrentlyUpdate:boolean=false;
  constructor(public employeeService: EmployeeServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.employeeService
      .getAll()
      .subscribe(employee => this.employees = employee);
  }

  ngDoCheck(){
    if(this.isUpdate==true) {
      this.getAllData();
      this.isCurrentlyUpdate=false
      this.newUpdateTableEvent.emit();
      // this.isUpdate=false;
    }

    // console.log("Check currentlyUpdate = "+this.isCurrentlyUpdate)
    
  }

  newUpdateEmp(employee:Employee){
    this.isCurrentlyUpdate = true;
    this.newUpdateEmpEvent.emit(employee);
  }

  deleteEmp(id:number){
    this.employeeService.deleteEmp(id).subscribe((res) => {
      if(res) {
        // console.log("berhasil delete");
        // console.log("currentlyUpdate EMP :"+this.isCurrentlyUpdate)
        if(this.isCurrentlyUpdate) {
          this.newDeleteEvent.emit()
          this.isCurrentlyUpdate=false
        }
        this.getAllData();
      }
    });
  }
}
