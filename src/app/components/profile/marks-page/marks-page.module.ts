import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarksPageRoutingModule } from './marks-page-routing.module';
import { MarksPageComponent } from './marks-page.component';
import { Term3Component } from './term3/term3.component';
import { Term2Component } from './term2/term2.component';
import { Term1Component } from './term1/term1.component';
import { MaterialModule } from 'app/material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [MarksPageComponent,Term3Component,Term2Component,Term1Component, DialogComponent],
  imports: [
    CommonModule,
    MarksPageRoutingModule,
    MaterialModule,
    FormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [],
      }}),


  ],
  // entryComponents:[ DialogComponent ]
})
export class MarksPageModule { }
