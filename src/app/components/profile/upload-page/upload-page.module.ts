import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadPageRoutingModule } from './upload-page-routing.module';
import { UploadPageComponent } from './upload-page.component';
import { UploadComponent } from './upload/upload.component';
import { UploadedComponent } from './uploaded/uploaded.component';
import { MaterialModule } from 'app/material/material.module';
import { LandinguploadComponent, newReminderComponent } from './landingupload/landingupload.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { DialogComponent } from './dialog/dialog.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { IssuesComponent } from './dialog/issues/issues.component';
import { ShortenttextPipe } from 'app/core/pipes/shortenttext.pipe';
import { SharedModule } from 'app/shared/shared.module';
import { FilenamePipe } from 'app/core/pipes/filename.pipe';
import { CoreModule } from 'app/core/core.module';



@NgModule({
  declarations: [UploadPageComponent, UploadComponent, UploadedComponent, LandinguploadComponent, DialogComponent, IssuesComponent, newReminderComponent,ShortenttextPipe],
  imports: [
    CommonModule,
    UploadPageRoutingModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    ContextMenuModule.forRoot({
      autoFocus: true,
    }),
    QuillModule.forRoot(),
    FormsModule,
  ],
  entryComponents: [ DialogComponent,newReminderComponent ]
})
export class UploadPageModule { }
