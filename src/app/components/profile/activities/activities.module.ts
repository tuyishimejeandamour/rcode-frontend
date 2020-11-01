import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';
import { StudentsComponent, DialogOverviewExampleDialog } from './students/students.component';
import { MaterialModule } from 'app/material/material.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [ActivitiesComponent, StudentsComponent, DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    FormsModule,
    MaterialModule,
    NgSelectModule

  ],
  entryComponents: [StudentsComponent, DialogOverviewExampleDialog],
})
export class ActivitiesModule { }
