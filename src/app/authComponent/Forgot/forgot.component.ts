import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
})
export class ForgotComponent {
  forgotForm: FormGroup
  constructor(private authData: AuthService, private routes: Router, private fb: FormBuilder) {
    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],

    })

  }
  forgotUser() {
    if (this.forgotForm.valid) {
      this.authData.forgotUser('http://localhost:4200/main/reset', this.forgotForm.value.email).subscribe((res: any) => {
        console.log(res);
        if (res.statusCode == 200) {
          Swal.fire('plz check your inbox email');
          this.routes.navigateByUrl("/main/login")
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'email doest not exit',
            footer: 'plz register your email first'
          })
          this.routes.navigateByUrl("/main/signup")

        }




      })
      console.warn(this.forgotForm.value)
    }
    else{
      Object.keys(this.forgotForm.controls).forEach(key=>this.forgotForm.controls[key].markAsTouched({onlySelf:true}))
    }

  }
  SignUp() {
    this.routes.navigateByUrl("/main/signup")
  }
  login() {
    this.routes.navigateByUrl("/main/login")
  }

}
