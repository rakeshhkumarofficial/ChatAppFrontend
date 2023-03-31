import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl ,constant} from 'src/constant';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private http:HttpClient) { }

  searchUser(user:any){
    return this.http.get(`${baseUrl}`+constant.User.search,{params:user})

  }
}
