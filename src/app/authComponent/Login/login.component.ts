import { Component } from '@angular/core';
import {  FormControl, FormGroup} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password:new FormControl(''),
  });
  constructor(private http:HttpClient,private authData :AuthService,private routes:Router) {
    console.log("hello")
  }
  loginUser() {
    this.authData.loginUser(this.loginForm.value).subscribe((res:any)=>{
      console.log(res);
      // if(res.isSuccess)
      //   {
      //     this.authData.registerToken(res.data['token']);
      //     this.routes.navigate(['/home'] ,{state : { 'name' : res.data['name'] ,
      //       'email': res.data['email'],
      //       'token' : res.data['token']
      //     }})
      //   }
    })
  }
  forgot()
  {
    this.routes.navigateByUrl("/main/forgot")
  }
  SignUp()
  {
    this.routes.navigateByUrl("/main/signup")
  }

}
