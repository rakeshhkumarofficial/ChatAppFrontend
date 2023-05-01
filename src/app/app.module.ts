import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthInterceptor } from './authComponent/interceptor/auth.interceptor';
import { ChatServiceService } from './mainDashboard/services/chat-service.service';
import { SocketconnectionService } from './services/socket/socketconnection.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    },
    SocketconnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
