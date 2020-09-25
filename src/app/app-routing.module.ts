import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRoutingModule } from './components/home/home-routing.module';
import { LoginRoutingModule } from './components/auth/login/login-routing.module';
import { RegisterRoutingModule } from './components/auth/register/register-routing.module';
import { ProfileRoutingModule } from './components/profile/profile-routing.module';
import { ResetPasswordRoutingModule } from './components/auth/reset-password/reset-password-routing.module';
import { NewPasswordRoutingModule } from './components/auth/new-password/new-password-routing.module';
import { EditorRoutingModule } from './components/cateditor/editor-routing.module';
import { MarktaskRoutingModule } from './components/marktask/marktask-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    LoginRoutingModule,
    RegisterRoutingModule,
    ProfileRoutingModule,
    ResetPasswordRoutingModule,
    NewPasswordRoutingModule,
    EditorRoutingModule,
    MarktaskRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
