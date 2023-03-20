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
    this.router.navigate(['login']);
  }
  loginUser(data:any){
   return this.http.post(`${baseUrl}`+constant.Auth.login ,data)
  }
  registerUser(data:any){
    return this.http.post(`${baseUrl}`+constant.Auth.signIn,data)
  }
  forgotUser(url:string,email:any){
    console.log(url);
    console.log(email);
    return this.http.post(`${baseUrl}`+constant.Auth.forgot,{url,email})
  }
  registerToken(value:string)
  {
      localStorage.setItem("token",value)
  }
}
