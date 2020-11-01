import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarktaskComponent } from './marktask.component';

const routes: Routes = [{ path: 'marktask/:id', component: MarktaskComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarktaskRoutingModule { }
