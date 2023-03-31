import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketconnectionService } from 'src/app/services/socket/socketconnection.service';
import { ChatServiceService } from '../services/chat-service.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { ImageLink } from 'src/constant';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  ImageLink:any=ImageLink
  allsearchUser: any = []
  searchForm: FormGroup
  sendMessage: FormGroup
  userName: string = '';
  userEmail: string = '';
  resivedata: any[] | undefined;
  message: any;
  old_msg: any;
  x: Number = 0;
  sendFile: any;
  type: Number = 1;
demoPic: any;
demoProfile: any;
getchatData:any;
onlineUser: any;
  constructor(private userdata: ChatServiceService, private fb: FormBuilder, private hub: SocketconnectionService, private data: AuthService) {
    this.searchForm = this.fb.group({
      name: [''],
    })
    this.sendMessage = this.fb.group({
      msg: [''],
    })
    this.hub.socketConnection.on('ReceiveMessage', (response1: any) => {
      console.log(response1.data, "response")
      this.old_msg.push(response1.data);
    })
  }
  startchat(user: any) {
    this.userName = user.firstName;
    this.userEmail = user.email;
    this.hub.socketConnection.invoke('CreateChat', user.email).then((response: any) => {
      this.message = response;
      console.log(this.message?.data?.receiverEmail, "email")
      this.hub.socketConnection.invoke('LoadMessages', this.message?.data?.receiverEmail, 1).then((response: any) => {
        console.log(this.old_msg = response.data.messages, "load msg")
        console.log('gs', this.message)
      })
    })
  }
  sendMsg() {
    console.log(this.type, "jhgca")
    this.hub.socketConnection.invoke('SendMessage', this.message?.data?.receiverEmail, this.sendMessage.value.msg, this.type).then((response: any) => {
      console.log(response);
      this.type = 1;   
    })
    const scrollTop = document.getElementById('scroll');
    scrollTop && (scrollTop.scrollTop = scrollTop.scrollHeight)
    scrollTop && (scrollTop.scrollTop = scrollTop.scrollHeight)
    console.log(this.sendMessage.value.msg)
    this.sendMessage.reset();
  }
  searchUser() {
    console.log(this.searchForm.value)
    this.userdata.searchUser(this.searchForm.value).subscribe((res: any) => {
      this.allsearchUser = res.data;
      console.log(this.allsearchUser)
    })
  }
  onChange(data: any) {
    console.log(data.target.value)
    this.x = data.target.value;
  }
  upload(id: any, event: any) {
    let formData = new FormData;
    this.type = id;
    console.log(this.type, "type")
    formData.append("File", event.target.files[0])
    this.data.uploadFile(formData, id).subscribe((res: any) => {
      console.log(typeof (res.data))
      this.sendFile = res.data
      this.sendMessage = new FormGroup({
        msg: new FormControl(ImageLink + this.sendFile),
      });
    })
    this.x = 0;
  }
   async ngOnInit(){
setTimeout(()=>{this.hub.invokeMethod().then((res:any)=>{
  console.log(res)
  this.getchatData=res
})},1000)


   }
}
