import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class EditorModule { }