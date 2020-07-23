import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AfterLoginService } from 'app/Service/after-login.service';

const routes: Routes = [
  {
    path:'profile',
    component:ProfileComponent,
    canActivate: [AfterLoginService],
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ProfileRoutingModule { }
