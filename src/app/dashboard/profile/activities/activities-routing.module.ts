import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { StudentsComponent } from './students/students.component';
const routes: Routes = [
  { path: '', component: ActivitiesComponent,children:[
    {
      path: '',  loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
    },


    {
      path: 'student', component: StudentsComponent
    },
    { path: 'preparetask', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
