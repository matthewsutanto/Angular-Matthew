import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthService, public router:Router) { }

  signinForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),

    email: new FormControl('', [Validators.required, Validators.email])
  })

  get password(){
    return this.signinForm.get('password')
  }

  get email() {
    return this.signinForm.get('email')
  }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signIn(this.signinForm.value)
      // .subscribe(
      //   res => {
      //     if(res) {
      //       this.signinForm.reset()
      //       this.router.navigate(['studios'])
      //     }
      //   },
      //   err => {
      //     alert(err)
      //   }
      // )
  }

}
