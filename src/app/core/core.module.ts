import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilenamePipe } from './pipes/filename.pipe';
import { TasknamePipe } from './pipes/taskname.pipe';

@NgModule({
  declarations: [FilenamePipe, TasknamePipe],
  imports: [
    CommonModule
  ],
  exports:[FilenamePipe,TasknamePipe]
})
export class CoreModule { }
