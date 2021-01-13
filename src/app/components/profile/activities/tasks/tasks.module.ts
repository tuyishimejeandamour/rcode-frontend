import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { NewtaskComponent } from './newtask/newtask.component';
import { TasklistComponent, DialogOverviewExampleDialog } from './tasklist/tasklist.component';
import { MaterialModule } from 'app/material/material.module';
import { FormsModule} from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { ContextMenuModule } from 'ngx-contextmenu';
import { DialogComponent } from './dialog/dialog.component';
import { SharedModule } from 'app/shared/shared.module';
export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};
@NgModule({
  declarations: [TasksComponent, NewtaskComponent, TasklistComponent, DialogOverviewExampleDialog, DialogComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule,
    QuillModule.forRoot(),
    ContextMenuModule.forRoot()
  ],
  entryComponents: [TasklistComponent, DialogOverviewExampleDialog, DialogComponent],
  providers: [
    DatePipe,
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS}
  ]
})
export class TasksModule { }
