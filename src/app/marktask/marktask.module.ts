import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarktaskRoutingModule } from './marktask-routing.module';
import { MarktaskComponent } from './marktask.component';


@NgModule({
  declarations: [MarktaskComponent],
  imports: [
    CommonModule,
    MarktaskRoutingModule
  ]
})
export class MarktaskModule { }
