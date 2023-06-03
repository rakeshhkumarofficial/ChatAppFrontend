import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketconnectionService } from 'src/app/services/socket/socketconnection.service';
import { ChatServiceService } from '../services/chat-service.service';
import Swal from 'sweetalert2';
import { AfterViewInit ,ChangeDetectorRef,AfterViewChecked} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ImageLink } from 'src/constant';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit,AfterViewChecked {

  page: number = 1;
  ImageLink: any = ImageLink
  waitingForResponse=false
  allsearchUser: any = []
  searchForm: FormGroup
  sendMessage: FormGroup
  userName: string = '';
  userEmail: string = '';
  resivedata: any[] | undefined;
  message: any;
  old_msg: any;
  filetype: Number = 0;
  sendFile: any;
  type: Number = 1;
  demoPic: any;
  demoProfile: any;
  getchatData: any;
  onlineUser: any;
  msgProfile: any
  constructor(private changeDetector:ChangeDetectorRef,private userdata: ChatServiceService, private fb: FormBuilder, private hub: SocketconnectionService, private data: AuthService,private route:Router) {
    this.msgProfile ="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1685772862~exp=1685773462~hmac=56bd0b9e3758f9400fb58f87d752a8e90667911ae859c1bff1c59049b68a7e78"
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
  ngAfterViewInit() {
    this.changeDetector.detectChanges()

  }
  ngAfterViewChecked(){
    this.changeDetector.detectChanges()
  }
  startchat(user: any) {
    this.userName = user.firstName + " " + user.lastName;
    this.msgProfile = ImageLink + user.profilePic;
    console.log(this.msgProfile)
    this.userEmail = user.email;
    this.hub.socketConnection.invoke('CreateChat', user.email).then((response: any) => {
      this.message = response;
      console.log(this.message?.data?.receiverEmail, "email")
      this.hub.socketConnection.invoke('LoadMessages', this.message?.data?.receiverEmail, this.page).then((response: any) => {
        console.log(this.old_msg = response.data.messages, "load messages")
        console.log('message is: ', this.message)
      })
    })
  }
  
  sendMsg() {
    if(this.message?.data?.receiverEmail=="chat@gmail.com"){
      this.waitingForResponse=true;
    }

    this.hub.socketConnection.invoke('SendMessage', this.message?.data?.receiverEmail, this.sendMessage.value.msg, this.type).then((response: any) => {
      console.log(response);
      this.type = 1;
      
      if(this.message?.data?.receiverEmail=="chat@gmail.com"){
        setTimeout(() => {
          this.hub.socketConnection.invoke('LoadMessages', this.message?.data?.receiverEmail, this.page).then((response: any) => {
           // this.waitingForResponse=false;
            console.log(this.old_msg = response.data.messages, "load msg")
            console.log('bot messages: ', this.message)
          })
        },1000);
      }
    })
    const scrollTop = document.getElementById('scroll');

    this.sendMessage.reset();
  }
  searchUser() {
    this.userdata.searchUser(this.searchForm.value).subscribe((res: any) => {
      this.allsearchUser = res;
      console.log(this.allsearchUser)
    })
  }
  onChange(data: any) {
    console.log(data.target.value)
    this.filetype = data.target.value;
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
    this.filetype = 0;
  }
  async ngOnInit() {
    setTimeout(() => {
      this.hub.invokeMethod()?.then((res: any) => {
        console.log(res)
        this.getchatData = res
      })
    }, 1000)
    this.hub.socketConnection.on('refreshChats',()=>{
      this.hub.invokeMethod()?.then((res: any) => {
        console.log(res)
        this.getchatData = res
      })
    })
  }
  onScrollUp() {
    if (!(this.old_msg.length < 20*this.page)) {
      this.hub.socketConnection.invoke('LoadMessages', this.message?.data?.receiverEmail, ++this.page).then((response: any) => {
        console.log(response)
        this.old_msg.unshift(...response.data.messages)
      })
    }
  }

  onScroll() {
    if (this.page > 1) {
      this.hub.socketConnection.invoke('LoadMessages', this.message?.data?.receiverEmail, --this.page).then((response: any) => {
        this.old_msg.unshift(...response.data.messages)
      })
    }

  }

}
