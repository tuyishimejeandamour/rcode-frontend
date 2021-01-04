import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePageComponent } from './profile-page.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AssignmentsComponent } from './assignments/assignments.component';

const routes: Routes = [ {
  path: '', component: ProfilePageComponent,children: [
    {
      path:'',
      component: ProfileInfoComponent
    },
    {
      path:'pro-info',
      component: ProfileInfoComponent
    }
    ,
    {
      path:'assignments',
      component: AssignmentsComponent
    }
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePageRoutingModule { }
