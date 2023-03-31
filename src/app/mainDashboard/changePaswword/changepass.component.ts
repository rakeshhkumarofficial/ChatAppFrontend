import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-pass',
  templateUrl: './changepass.component.html',
})
export class ChangePassComponent {
  changepassForm :FormGroup
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
    constructor(private fb:FormBuilder ,private authData:AuthService){
      this.changepassForm = this.fb.group({
        oldPassword: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')])],
        newPassword: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')])],
        confirmPassword: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')])]
      })
    }
    changePass(){
      if (this.changepassForm.valid && this.passwordsMatching == true){
        // this.authData.resetPassword(this.resetForm.value).subscribe((res:any)=>{
           this.authData.changePass(this.changepassForm.value).subscribe((res:any)=>{
            console.log(res);
            this.changepassForm.reset();
            if(res.statusCode==200){
              Swal.fire(
                'Good job!',
                'password has been change!',
                'success'
              )
              this.authData.logout();
            }
           })


      }
      else{
        Object.keys(this.changepassForm.controls).forEach(key => this.changepassForm.controls[key].markAsTouched({ onlySelf: true }))
      }

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

    // {
    //     "oldPassword": "string",
    //     "newPassword": "string",
    //     "confirmPassword": "string"
    //   }
}
