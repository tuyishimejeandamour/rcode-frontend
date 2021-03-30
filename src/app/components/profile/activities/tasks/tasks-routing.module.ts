import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { TasklistComponent } from './tasklist/tasklist.component';

const routes: Routes = [{ path: '', component: TasksComponent,children:[
  {
    path:'',
    component:TasklistComponent
  },

] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
