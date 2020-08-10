import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarksPageRoutingModule } from './marks-page-routing.module';
import { MarksPageComponent } from './marks-page.component';
import { Term3Component } from './term3/term3.component';
import { Term2Component } from './term2/term2.component';
import { Term1Component } from './term1/term1.component';
import { MaterialModule } from 'app/material/material.module';


@NgModule({
  declarations: [MarksPageComponent,Term3Component,Term2Component,Term1Component],
  imports: [
    CommonModule,
    MarksPageRoutingModule,
    MaterialModule

  ]
})
export class MarksPageModule { }
