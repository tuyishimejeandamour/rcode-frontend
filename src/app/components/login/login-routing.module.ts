import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
//import { BeforeLoginService } from 'app/Service/before-login.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [BeforeLoginService]
  }
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
