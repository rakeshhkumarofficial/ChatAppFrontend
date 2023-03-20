import { Injectable } from "@angular/core";
import { HttpRequest,HttpHandler, HttpInterceptor } from "@angular/common/http";
@Injectable()

export class intercepter implements HttpInterceptor {
    constructor(){}
    intercept(request:HttpRequest<any>, next:HttpHandler){
        
    }


}