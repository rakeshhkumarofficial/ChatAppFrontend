import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { chatconnection } from 'src/constant';
//import { HttpClient } from '@microsoft/signalr';
//import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
const token :any  = localStorage.getItem("token");
@Injectable({
  providedIn: 'root'
})
export class SocketconnectionService {

  connectionkey:boolean=false;

public socketConnection :signalR.HubConnection |any
  constructor() { }
  public startConnection(){
    this.socketConnection = new signalR.HubConnectionBuilder().withUrl(chatconnection,
      { 
          skipNegotiation: true,
           transport: signalR.HttpTransportType.WebSockets,
           accessTokenFactory :()=> token
      }).withAutomaticReconnect().build();
     this.socketConnection.start().then((res:any)=>{
       this.connectionkey=true;
       console.log("connected");
       
     }).catch((error:any)=>{
           this.connectionkey=false;
           console.log(error);
     }
     )
  }

  invokeMethod() {
    if(this.connectionkey==true){
    return  this.socketConnection.invoke('GetChatList')
    }
}
getonlineUsers() {
  if(this.connectionkey==true){
    return  this.socketConnection.invoke('GetOnlineUsers')
    }
 
}

}
//export const connectionkey;

