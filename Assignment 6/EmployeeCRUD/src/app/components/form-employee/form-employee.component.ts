import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/Modules/Employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {
  @Output() newEmpEvent = new EventEmitter<any>();
  @Output() newFinishDeleteEvent = new EventEmitter<any>();
  // modalRef: mdb  
  // @ViewChild('content') private modal:ElementRef<any>;
  @Input() updateEmployee: Employee = {
    id: -1,
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: ""
  }
  @Input()isDelete: boolean = false;
  closeResult = "";
  btnName: string = "Add Employee";
  isUpdate: boolean = false;
  idEmpUpdate: number = -1;
  alertType: string ="Danger";

  constructor(public employeeService: EmployeeServiceService, private modalService: NgbModal) { }

  employeeForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
      Validators.minLength(3)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
      Validators.minLength(3)
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z \.]*$'),
      Validators.minLength(3)
    ]),
    Role: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
    ])
  })

  ngOnInit(): void {
  }

  get fName() {
    return this.employeeForm.get("firstName")
  }

  get lName() {
    return this.employeeForm.get("lastName")
  }

  get title() {
    return this.employeeForm.get("title")
  }

  get Role() {
    return this.employeeForm.get("Role")
  }

  get email() {
    return this.employeeForm.get("email")
  }

  get password() {
    return this.employeeForm.get("password")
  }

  get passwordCon() {
    return this.employeeForm.get("confirmPassword")
  }

  inputEmployee(content: any) {
    if (this.employeeForm.valid) {
      // this.modalService.open(content)

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        // console.log(this.employeeForm.value)
        if (this.password?.value == this.passwordCon?.value) {
          if (!this.isUpdate) {
            this.employeeService.newEmp(this.employeeForm.value).pipe
            (catchError((err)=> {
              console.log(err);
              alert("Email already in use");
              return of () 
            })).subscribe((res) => {
              if (res) {
                this.employeeForm.reset();
                // console.log("berhasil")
                this.newEmpEvent.emit();
              }
            })
            // console.log("masuk new ")
          } else {
            this.employeeService.updateEmp(this.employeeForm.value, this.idEmpUpdate).subscribe((res) => {
              if (res) {
                this.employeeForm.reset();
                // console.log("berhasil update")
                this.newEmpEvent.emit();
                this.idEmpUpdate = -1;
                this.isUpdate = false;
                this.btnName = "Add Employee";
                this.employeeForm.reset();
              }
            });
          }
        }else {
          alert("Confirm Password is not same with Password")
        }
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

    }
  }

  ngDoCheck() {
    if (this.updateEmployee.id != -1) {
      this.updateForm()

      this.updateEmployee = {
        id: -1,
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: ""
      };
    }
    // console.log(this.isDelete)
    // console.log("Is update "+this.isUpdate)
    // console.log("is delete " + this.isDelete)
    if(this.isDelete) {
      this.idEmpUpdate = -1;
      this.isUpdate = false;
      this.btnName = "Add Employee";
      this.employeeForm.reset();
      this.newFinishDeleteEvent.emit();
      this.isDelete=false;
    }
  }

  updateForm() {
    this.fName?.setValue(this.updateEmployee.firstName);
    this.lName?.setValue(this.updateEmployee.lastName);
    this.title?.setValue(this.updateEmployee.title);
    this.Role?.setValue(this.updateEmployee.role);
    this.email?.setValue(this.updateEmployee.email);
    this.password?.setValue(this.updateEmployee.password);
    this.passwordCon?.setValue(this.updateEmployee.confirmPassword);
    this.btnName = "Update Employee";
    this.isUpdate = true;
    this.idEmpUpdate = this.updateEmployee.id;
  }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

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
