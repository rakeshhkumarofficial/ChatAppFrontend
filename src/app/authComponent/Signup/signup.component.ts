import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {

  registerForm = new FormGroup({
    email: new FormControl(''),
    firstName:new FormControl(''),
    lastName:new FormControl(''),
    password:new FormControl(''),
    phone:new FormControl(''),
    dateOfBirth:new FormControl(''),
  });
  constructor(private authData :AuthService,private routes: Router) {
   
  }
  registerUser(){
    this.authData.registerUser(this.registerForm.value).subscribe((res:any)=>{
      console.log(res);
      console.log(this.registerForm.value)
    })
  }
  login(){
    this.routes.navigateByUrl("/main/login")
  }
}
