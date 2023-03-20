import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './Home/home.component';
import { AboutComponent } from './About/about.component';
import { FooterComponent } from './Footer/footer.component';
import { ContactUsComponent } from './Contact-us/contact.componenet';
import { HeaderComponent } from './Header/header.component';


@NgModule({
  declarations: [HomeComponent,AboutComponent,FooterComponent,ContactUsComponent,HeaderComponent],
  imports: [
    CommonModule,
    MainRoutingModule
 
  ],
  exports:[
   
  ]
  
})
export class MainDashboardModule { }
