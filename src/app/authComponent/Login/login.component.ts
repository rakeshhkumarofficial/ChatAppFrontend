import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { SocketconnectionService } from 'src/app/services/socket/socketconnection.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  setValue(arg0: string) {
    throw new Error('Method not implemented.');
  }
  title = 'auth';
  loginForm: FormGroup
  constructor(private http: HttpClient, private authData: AuthService, private routes: Router, private fb: FormBuilder ,private hub : SocketconnectionService) {

    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')])]
    })

  }
  ngOnInit(): void {
    if (this.authData.isLoggedIn()) {
      this.routes.navigateByUrl("home")
    }
  }
  loginUser() {
    if (this.loginForm.valid) {
      this.authData.loginUser(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
        if (res.statusCode == 200) {
          this.authData.registerToken(res.data['token']);
          this.routes.navigate(['/home'], {
            state: {
              'name': res.data['name'],
              'email': res.data['email'],
              'token': res.data['token']
            }
          })
          this.hub.startConnection()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You has been login Sucesfully',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      })
    }
    else {
      Object.keys(this.loginForm.controls).forEach(key => this.loginForm.controls[key].markAsTouched({ onlySelf: true }))
    }
  }
  forgot() {
    this.routes.navigateByUrl("/main/forgot")
  }
  SignUp() {
    this.routes.navigateByUrl("/main/signup")
  }

}
