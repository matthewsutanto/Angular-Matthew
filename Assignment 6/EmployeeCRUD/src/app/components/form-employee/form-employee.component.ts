import { Component, OnInit, Output, SimpleChange, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/Modules/Employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {
  @Output() newEmpEvent = new EventEmitter<any>();

  @Input() updateEmployee: Employee = {
    id:  -1,
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword : ""
  }

  isUpdate: boolean=false;
  idEmpUpdate: number=-1;
  constructor(public employeeService: EmployeeServiceService) { }
  btnName:string="Add Employee";

  employeeForm = new FormGroup({
    firstName: new FormControl('',[
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

  get fName(){
    return this.employeeForm.get("firstName")
  }

  get lName(){
    return this.employeeForm.get("lastName")
  }

  get title(){
    return this.employeeForm.get("title")
  }

  get categoryOption(){
    return this.employeeForm.get("Role")
  }

  get email(){
    return this.employeeForm.get("email")
  }

  get password(){
    return this.employeeForm.get("password")
  }

  get passwordCon(){
    return this.employeeForm.get("confirmPassword")
  }

  inputEmployee(){
    if(this.employeeForm.valid) {
      console.log(this.employeeForm.value)
      if(this.password?.value == this.passwordCon?.value) {
        if(!this.isUpdate) {
          this.employeeService.newEmp(this.employeeForm.value).subscribe((res) => {
            if(res) {
              this.employeeForm.reset();
              console.log("berhasil")
              this.newEmpEvent.emit();
            }
          })
        } else {
          this.employeeService.updateEmp(this.employeeForm.value, this.idEmpUpdate).subscribe((res) => {
            if(res) {
              this.employeeForm.reset();
              console.log("berhasil update")
              this.newEmpEvent.emit();
              this.idEmpUpdate=-1;
              this.isUpdate=false;
              this.btnName="Add Employee";
              this.employeeForm.reset();
            }
          });
        }
      }
    }
  }

  ngDoCheck(){
    if(this.updateEmployee.id!=-1) {
      this.updateForm()
      
      this.updateEmployee={
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
  }

  updateForm() {
      this.fName?.setValue(this.updateEmployee.firstName);
      this.lName?.setValue(this.updateEmployee.lastName);
      this.title?.setValue(this.updateEmployee.title);
      this.categoryOption?.setValue(this.updateEmployee.role);
      this.email?.setValue(this.updateEmployee.email);
      this.password?.setValue(this.updateEmployee.password);
      this.passwordCon?.setValue(this.updateEmployee.confirmPassword);
      this.btnName="Update Employee";
      this.isUpdate=true;
      this.idEmpUpdate=this.updateEmployee.id;
  }
}
