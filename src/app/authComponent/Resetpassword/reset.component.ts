import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Token } from '@angular/compiler';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
})
export class ResetComponent {
  token:string='';
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  resetForm :FormGroup
 
  constructor(private authData :AuthService,private routes:Router , private route :ActivatedRoute ,private fb:FormBuilder) {
    this.route.queryParams.subscribe(params => {
        this.token=params['token'];
        this.authData.registerToken(this.token)
      });
      this.resetForm = this.fb.group({
        newPassword: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')])],
        confirmPassword: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')])]
      })
  }
  resetUser(){
    if (this.resetForm.valid && this.passwordsMatching == true){
    this.authData.resetPassword(this.resetForm.value).subscribe((res:any)=>{
      console.log(res);
      this.authData.removeToken();
      this.resetForm.reset();
      Swal.fire(
        'Password Reset Successfull',
        'Login Again',
        'success'
      )
      this.routes.navigateByUrl("/main/login")
    })
    console.warn(this.resetForm.value)
  }
  else{
    Object.keys(this.resetForm.controls).forEach(key => this.resetForm.controls[key].markAsTouched({ onlySelf: true }))
  }
}
  SignUp()
  {
    this.routes.navigateByUrl("/main/signup")
  }
  login(){
    this.routes.navigateByUrl("/main/login")
  }
  checkPasswords(pw: string, cpw: string) {
    this.isConfirmPasswordDirty = true;
    if (pw == cpw) {
      this.passwordsMatching = true;
      this.confirmPasswordClass = 'form-control is-valid';
    } else {
      this.passwordsMatching = false;
      this.confirmPasswordClass = 'form-control is-invalid';
    }
  }
}
