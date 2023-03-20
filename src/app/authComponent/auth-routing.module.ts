import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './Forgot/forgot.component';
import { LoginComponent } from './Login/login.component';
import { MainAuthComponent } from './Main/main.component';
import { ResetComponent } from './Resetpassword/reset.component';
import { SignupComponent } from './Signup/signup.component';


const routes: Routes = [
    {
        path: '',
        component: MainAuthComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'signup', component: SignupComponent },
          {path: 'main',component:MainAuthComponent},
          {path: 'forgot',component:ForgotComponent},
          {path:'reset',component:ResetComponent},
          {path: '', redirectTo: '/main/login', pathMatch: 'full' },
        ],
      },
    ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
