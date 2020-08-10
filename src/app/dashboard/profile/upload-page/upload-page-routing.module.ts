import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadPageComponent } from './upload-page.component';
import { LandinguploadComponent } from './landingupload/landingupload.component';
import { UploadedComponent } from './uploaded/uploaded.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [{ path: '', component: UploadPageComponent,children:[
  {
    path:"",
    component: LandinguploadComponent
  },
  {
    path:"landing",
    component: LandinguploadComponent
  },
  {
    path:"uploaded",
    component: UploadedComponent
  },
  {
    path:"upload",
    component: UploadComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadPageRoutingModule { }
