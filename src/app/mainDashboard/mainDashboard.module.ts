import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './About/about.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact.componenet';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@microsoft/signalr';
import { HttpClientModule } from '@angular/common/http';
import { ChangePassComponent } from './changePaswword/changepass.component';
import { UpdateProfileComponent } from './update-profile/updateprofile.component';


@NgModule({
  declarations: [HomeComponent,AboutComponent,FooterComponent,ContactUsComponent,HeaderComponent,SearchComponent,ChangePassComponent,UpdateProfileComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
   
  ]
  
})
export class MainDashboardModule { }
