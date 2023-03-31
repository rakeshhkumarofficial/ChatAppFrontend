import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketconnectionService } from 'src/app/services/socket/socketconnection.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private authdata :AuthService ,private routes:Router,private hub :SocketconnectionService){
  }
  changePassword() {

  this.routes.navigateByUrl("/home/changepass")
  
  }
  startChat(){
    this.routes.navigateByUrl("/home/search")
  }
  updateProfile(){
    this.routes.navigateByUrl("/home/update")
  }
logOut() {
  this.authdata.logout();
  Swal.fire(
    'logout sucessfully',
    'you has been logout',
    'success'
  )
//   this.hub.socketConnection.invoke('GetChatList',()=>{console.log('Helllo');
//   }).then((res:any)=>{
// console.log('Responce ------------------>',res);

//   }).catch((err:any)=>{
//     console.log('Error ------------------>',err);

//   })
  
}

}
