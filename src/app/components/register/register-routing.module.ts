import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { BeforeLoginService } from 'app/Service/before-login.service';

const routes: Routes = [
  {
    path: 'register',
    canActivate: [BeforeLoginService],
    component: RegisterComponent

  }
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
