import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ImageLink } from 'src/constant';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-file',
  templateUrl: './updateprofile.component.html',
})
export class UpdateProfileComponent implements OnInit {
    updateprofileForm: FormGroup;
    userData:any;
    myDate: any;
    validAge: boolean = false;
    isDisabled:boolean=true;
    profilePic:any
    constructor(private authData:AuthService, private fb:FormBuilder,private routes:Router){
    
        this.updateprofileForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            gender: ['', Validators.required],
            phone: ['***************', Validators.compose([Validators.required, Validators.pattern("^[6-9]\\d{9}$")])],
            dateOfBirth: ['', Validators.compose([Validators.required])],
          })
 
    }
     async ngOnInit(){
            const res:any = await this.authData.getuserDetails().toPromise();
            console.log(res.data)
            this.profilePic=ImageLink+res?.data?.profilePic
            this.userData=res;
            console.log(this.userData?.data?.dateOfBirth)
            this.updateprofileForm = this.fb.group({
            firstName: [res?.data?.firstName, Validators.required],
            lastName: [res?.data?.lastName, Validators.required],
            gender: [String(res.data?.gender), Validators.required],
            phone: [res?.data?.phone, Validators.compose([Validators.required, Validators.pattern("^[6-9]\\d{9}$")])],
            dateOfBirth: [res?.data?.dateOfBirth, Validators.compose([Validators.required])],
          })
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
    updateForm(){
      if(this.updateprofileForm.valid){
        this.authData.updateProfile(this.updateprofileForm.value).subscribe((res:any)=>{
          console.log(res);
          if(res.statusCode==200){
            Swal.fire(
              'Good job!',
              'Profile Has been Updated',
              'success'
            )
            this.routes.navigateByUrl("home")
          }
        })
      }
    }
    upload( event: any) {
      console.log(event.target.files[0], "file")
      let formData = new FormData;
      formData.append("File", event.target.files[0])
      this.authData.uploadFile(formData, 1).subscribe((res: any) => {
        console.log(res)
        
        if(res.statusCode==200){
          this.routes.navigateByUrl("/home")
        }
        });
      }
}
