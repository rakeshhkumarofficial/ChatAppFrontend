import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class profileComponent {
    constructor(private data:AuthService,private routes :Router){}
    upload( event: any) {
        console.log(event.target.files[0], "file")
        let formData = new FormData;
        formData.append("File", event.target.files[0])
        this.data.uploadFile(formData, 1).subscribe((res: any) => {
          console.log(res)
          
          if(res.statusCode==200){
            this.routes.navigateByUrl("/home")
          }
          });
        }
        skip(){
          this.routes.navigate(['/main'])
        }
  
      }
  

