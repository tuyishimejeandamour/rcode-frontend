import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { LoginRoutingModule } from './components/login/login-routing.module';
import { RegisterRoutingModule } from './components/register/register-routing.module';
import { ProfileRoutingModule } from './dashboard/profile/profile-routing.module';
import { ResetPasswordRoutingModule } from './components/reset-password/reset-password-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    DetailRoutingModule,
    LoginRoutingModule,
    RegisterRoutingModule,
    ProfileRoutingModule,
    ResetPasswordRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
