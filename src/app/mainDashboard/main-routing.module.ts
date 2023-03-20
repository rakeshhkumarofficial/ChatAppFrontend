import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './About/about.component';
import { ContactUsComponent } from './Contact-us/contact.componenet';
import { HomeComponent } from './Home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'about', component: AboutComponent },
          { path: 'contact', component: ContactUsComponent},
          { path: '', redirectTo: '/home', pathMatch: 'full' },
        ],
      },
    ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
