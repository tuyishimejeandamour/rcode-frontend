import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarktaskRoutingModule } from './marktask-routing.module';
import { MarktaskComponent } from './marktask.component';
import { SharedModule } from 'app/shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  
  declarations: [MarktaskComponent],
  imports: [
    CommonModule,
    MarktaskRoutingModule,
    SharedModule,
    AngularSplitModule,
    BrowserModule,
    FormsModule,
  ],
 

})
export class MarktaskModule { }
