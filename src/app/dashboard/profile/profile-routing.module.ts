import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { ActivitiesComponent } from './activities/activities.component';
import { UploadPageComponent } from './upload-page/upload-page.component';


const routes: Routes = [
  {
    path:'profile',
    component:ProfileComponent,children:[
      {
        path: '', component: FileExplorerComponent
      },
      {
        path: 'filexplorer', component: FileExplorerComponent
      },

      { path: 'markspage', loadChildren: () => import('./marks-page/marks-page.module').then(m => m.MarksPageModule) }
      ,
      {
        path: 'activities', component: ActivitiesComponent
      }
      ,
      {
        path: 'upload', component: UploadPageComponent
      },
      { path: 'profile-page', loadChildren: () => import('./profile-page/profile-page.module').then(m => m.ProfilePageModule) }


    ]
  }


]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
  exports:[RouterModule]
})
export class ProfileRoutingModule { }
