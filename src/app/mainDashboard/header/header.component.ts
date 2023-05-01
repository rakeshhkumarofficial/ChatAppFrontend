import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketconnectionService } from 'src/app/services/socket/socketconnection.service';
import Swal from 'sweetalert2';
import { navLink } from 'src/constant';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
callFunction:any
  navLink:any=navLink;
  constructor(private authdata :AuthService ,private routes:Router,private hub :SocketconnectionService){
  }
  submit(event:any){
    if(event.target.value=='changePassword'){
      this.routes.navigateByUrl("/home/changepass")
    }
    if(event.target.value=='startChat'){
      this.routes.navigateByUrl("/home/search")
    }
    if(event.target.value=='updateProfile'){
      this.routes.navigateByUrl("/home/update")
    }
    if(event.target.value=='logOut'){
      this.authdata.logout();
      Swal.fire(
        'logout sucessfully',
        'you has been logout',
        'success'
      )
    }
  }


}
