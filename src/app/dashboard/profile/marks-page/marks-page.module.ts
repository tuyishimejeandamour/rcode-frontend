import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarksPageRoutingModule } from './marks-page-routing.module';
import { MarksPageComponent } from './marks-page.component';


@NgModule({
  declarations: [MarksPageComponent],
  imports: [
    CommonModule,
    MarksPageRoutingModule
  ]
})
export class MarksPageModule { }
