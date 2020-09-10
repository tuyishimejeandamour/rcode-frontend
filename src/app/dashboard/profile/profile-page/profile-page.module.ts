import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { MaterialModule } from 'app/material/material.module';
import { DialogComponent } from './profile-info/dialog/dialog.component';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { DialogAssignComponent } from './assignments/dialog/dialog.component';
import { AngularSplitModule } from 'angular-split';


@NgModule({
  declarations: [ProfilePageComponent, ProfileInfoComponent, AssignmentsComponent, ChallengesComponent, DialogComponent, DialogAssignComponent],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    MaterialModule,
    MonacoEditorModule,
    FormsModule,
    AngularSplitModule
  ],
  entryComponents: [DialogComponent,DialogAssignComponent]
})
export class ProfilePageModule { }
