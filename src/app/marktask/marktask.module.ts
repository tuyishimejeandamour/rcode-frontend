import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarktaskRoutingModule } from './marktask-routing.module';
import { MarktaskComponent } from './marktask.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [MarktaskComponent],
  imports: [
    CommonModule,
    MarktaskRoutingModule,
    SharedModule
  ]
})
export class MarktaskModule { }
