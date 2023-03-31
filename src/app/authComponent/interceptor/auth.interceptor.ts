import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');
    console.log(token)
    if(token!=null)
    {
        req = req.clone({
            headers:req.headers.set('Authorization' ,`bearer ${token}`)
        })
    }
    return next.handle(req) .pipe(
      catchError((error : HttpErrorResponse)=>{
          let errorMsg='';

          if(error.error instanceof ErrorEvent)
          {
              errorMsg = 'Error :${error.error.message}'
          }
          else
          {
              errorMsg = 'Error Code :${error.status}, Message :${error.message}';
          }
          console.log(errorMsg);
          return throwError(errorMsg);
      })
  )
  }
}
