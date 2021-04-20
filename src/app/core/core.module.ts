import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilenamePipe } from './pipes/filename.pipe';
import { TasknamePipe } from './pipes/taskname.pipe';
import { ShortenttextPipe } from './pipes/shortenttext.pipe';
import { NoSanitizePipe } from './pipes/no-sanitize-pipe.pipe';

@NgModule({
  declarations: [FilenamePipe, TasknamePipe,ShortenttextPipe, NoSanitizePipe],
  imports: [
    CommonModule
  ],
  exports:[FilenamePipe,TasknamePipe,ShortenttextPipe,NoSanitizePipe]
})
export class CoreModule { }
