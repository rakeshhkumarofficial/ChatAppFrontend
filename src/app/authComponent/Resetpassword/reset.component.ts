import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
})
export class ResetComponent {
  resetForm = new FormGroup({
    password: new FormControl(''),
  });
  constructor(private authData :AuthService,private routes:Router , private route :ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
        console.log(params['token']);
      });
  }
  resetUser(){
    // this.authData.forgotUser(this.resetForm.value.password).subscribe((res:any)=>{
    //   console.log(res);
      
    // })
    console.warn(this.resetForm.value)
  }
  SignUp()
  {
    this.routes.navigateByUrl("/main/signup")
  }
  login(){
    this.routes.navigateByUrl("/main/login")
  }

}
