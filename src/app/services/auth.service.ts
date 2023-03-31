import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { baseUrl ,constant} from 'src/constant';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl=baseUrl;
  constant=constant;
  constructor(private router:Router,private http: HttpClient) { }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }  
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/main/login']);
  }
  loginUser(data:any){
   return this.http.post(`${baseUrl}`+constant.Auth.login ,data)
  }
  registerUser(data:any){
    return this.http.post(`${baseUrl}`+constant.Auth.signIn,data)
  }
  changePass(data:any){
    return this.http.put('http://192.180.0.127:4040/api/User/ChangePassword',data)
  }
  resetPassword(newpassword:any){
    return this.http.post(`${baseUrl}`+constant.Auth.reset,newpassword)
  }
  forgotUser(url:string,email:any){
    console.log(url);
    console.log(email);
    return this.http.post(`${baseUrl}`+constant.Auth.forgot,{url,email})
  }
  updateProfile(data:any){
    return this.http.put('http://192.180.0.127:4040/api/User/Update',data)

  }
  registerToken(value:string)
  {
      localStorage.setItem("token",value)
  }
  removeToken(){
    localStorage.clear();
  }
  getuserDetails(){
   return this.http.get('http://192.180.0.127:4040/api/User/GetUser')
  }

  uploadFile(File:any,data:any){
    console.log(File)
    const params = {
      type : data
    }
    console.log(data,"data")
    return this.http.post('http://192.180.0.127:4040/api/File/FileUpload',File, {params : params})
  }
}
