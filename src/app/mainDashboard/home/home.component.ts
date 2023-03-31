import { Component, OnInit } from '@angular/core';
import { SocketconnectionService } from 'src/app/services/socket/socketconnection.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit  {
  
  constructor(private hub:SocketconnectionService){
 
  
  }
  ngOnInit() {
  
  this.hub.startConnection()
    
  }

}
