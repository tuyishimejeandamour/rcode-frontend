import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilenamePipe } from './pipes/filename.pipe';

@NgModule({
  declarations: [FilenamePipe],
  imports: [
    CommonModule
  ],
  exports:[FilenamePipe]
})
export class CoreModule { }
