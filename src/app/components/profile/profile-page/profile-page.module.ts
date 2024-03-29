import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MaterialModule } from 'app/material/material.module';
import { DialogComponent } from './profile-info/dialog/dialog.component';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { DialogAssignComponent } from './assignments/dialog/dialog.component';
import { AngularSplitModule } from 'angular-split';
import { QuillModule } from 'ngx-quill';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [ProfilePageComponent, ProfileInfoComponent, AssignmentsComponent, DialogComponent, DialogAssignComponent ],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    MaterialModule,
    MonacoEditorModule,
    FormsModule,
    SharedModule,
    AngularSplitModule,
    HighchartsChartModule,
    QuillModule.forRoot()
  ],
  entryComponents: [DialogComponent,DialogAssignComponent]
})
export class ProfilePageModule { }
