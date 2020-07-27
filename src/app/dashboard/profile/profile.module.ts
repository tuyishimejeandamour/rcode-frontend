import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from './profile.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { ActivitiesComponent } from './activities/activities.component';
import { UploadPageComponent } from './upload-page/upload-page.component';



@NgModule({
  declarations: [ ProfileComponent, FileExplorerComponent, ActivitiesComponent, UploadPageComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ]
})
export class ProfileModule { }
