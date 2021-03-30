import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MaterialModule } from 'app/material/material.module';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { DialogAssignComponent } from './assignments/dialog/dialog.component';
import { AngularSplitModule } from 'angular-split';
import { QuillModule } from 'ngx-quill';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from 'app/shared/shared.module';
import { CoreModule } from 'app/core/core.module';

@NgModule({
  declarations: [ProfilePageComponent, ProfileInfoComponent, AssignmentsComponent, DialogAssignComponent ],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    MaterialModule,
    MonacoEditorModule,
    FormsModule,
    SharedModule,
    CoreModule,
    AngularSplitModule,
    HighchartsChartModule,
    QuillModule.forRoot()
  ],
  entryComponents: [DialogAssignComponent]
})
export class ProfilePageModule { }
