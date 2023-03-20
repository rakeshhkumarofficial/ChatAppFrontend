import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/main/login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./mainDashboard/mainDashboard.module').then((m) => m.MainDashboardModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./authComponent/auth.module').then((n)=> n.AuthDashboardModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
