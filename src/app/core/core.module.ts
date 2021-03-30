import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilenamePipe } from './pipes/filename.pipe';
import { TasknamePipe } from './pipes/taskname.pipe';
import { ShortenttextPipe } from './pipes/shortenttext.pipe';

@NgModule({
  declarations: [FilenamePipe, TasknamePipe,ShortenttextPipe],
  imports: [
    CommonModule
  ],
  exports:[FilenamePipe,TasknamePipe,ShortenttextPipe]
})
export class CoreModule { }
