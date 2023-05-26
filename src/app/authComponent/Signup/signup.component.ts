import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  myDate: any;
  validAge: boolean = false;
  registerForm: FormGroup;
  constructor(private authData: AuthService, private routes: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern("^[6-9]\\d{9}$")])],
      dateOfBirth: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')])]
    })

  }
  ngOnInit(): void {
    if (this.authData.isLoggedIn()) {
      this.routes.navigateByUrl("home")
    }
  }
  validDate(event: any) {
    if (event.target.value) {
      this.myDate = new Date(event.target.value);
      const timeDiff = Math.abs(Date.now() - this.myDate.getTime());
      const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      console.log(age)
      if ((age) < 12) {
        this.validAge = true

      } else {
        this.validAge = false
      }
    }
  }
  registerUser() {
    this.registerForm.value.gender=Number( this.registerForm.value.gender)
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      this.authData.registerUser(this.registerForm.value).subscribe((res: any) => {
        console.log(res)
        if (res.statusCode == 200) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registered Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.authData.registerToken(res.data['token']);
          this.routes.navigate(['/main/profile'], {
            state: {
              'name': res.data['name'],
              'email': res.data['email'],
              'token': res.data['token']
            }
          })
        }
        else if (res.statusCode == 409) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email Already Exists',
          })
        }
      })
    }
    else {
      Object.keys(this.registerForm.controls).forEach(key => this.registerForm.controls[key].markAsTouched({ onlySelf: true }))
    }
  }
  login() {
    this.routes.navigateByUrl("/main/login")
  }
}
