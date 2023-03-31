import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './Signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import {  LoginComponent } from './Login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MainAuthComponent } from './Main/main.component';
import { ForgotComponent } from './Forgot/forgot.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetComponent } from './Resetpassword/reset.component';

@NgModule({
  declarations: [SignupComponent,LoginComponent,MainAuthComponent,ForgotComponent,ResetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
  ],
  exports:[
   
  ]
  
})
export class AuthDashboardModule { }
