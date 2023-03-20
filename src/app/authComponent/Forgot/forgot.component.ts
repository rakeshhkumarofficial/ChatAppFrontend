import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
})
export class ForgotComponent {
  forgotForm = new FormGroup({
    email: new FormControl(''),
  });
  constructor(private authData :AuthService,private routes:Router) {
   
  }
  forgotUser(){
    this.authData.forgotUser('http://localhost:4200/main/reset',this.forgotForm.value.email).subscribe((res:any)=>{
      console.log(res);
      
    })
    console.warn(this.forgotForm.value)
  }
  SignUp()
  {
    this.routes.navigateByUrl("/main/signup")
  }
  login(){
    this.routes.navigateByUrl("/main/login")
  }

}
