import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { MaterialModule } from 'app/material/material.module';


@NgModule({
  declarations: [ProfilePageComponent, ProfileInfoComponent, AssignmentsComponent, ChallengesComponent],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    MaterialModule
  ]
})
export class ProfilePageModule { }
