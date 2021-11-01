import { Component } from '@angular/core';
import { Employee } from './Modules/Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeCRUD';
  signUpdate:boolean = false;
  signDelete:boolean = false;
  
  employee:Employee = {
    id:  -1,
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword : ""
  };

  updateTable() {
    this.signUpdate =  true;
    
  }

  updateTableFinish(){
    this.signUpdate = false;
    this.employee={
      id:  -1,
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      password: "",
      confirmPassword : ""
    };
  }

  updateEmpEvent(id:Employee) {
    this.employee = id;
  }

  deleteEmpEvent(){

  }
}
