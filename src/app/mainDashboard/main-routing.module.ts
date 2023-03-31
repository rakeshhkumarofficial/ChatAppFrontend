import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './About/about.component';
import { ChangePassComponent } from './changePaswword/changepass.component';
import { ContactUsComponent } from './contact-us/contact.componenet';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { UpdateProfileComponent } from './update-profile/updateprofile.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'about', component: AboutComponent },
          { path: 'contact', component: ContactUsComponent},
          {path:'changepass',component:ChangePassComponent},
          {path:'search',component:SearchComponent},
          {path:'update',component:UpdateProfileComponent},
          {path: '', redirectTo: '/home/search', pathMatch: 'full'},
        ],
      },
    ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
