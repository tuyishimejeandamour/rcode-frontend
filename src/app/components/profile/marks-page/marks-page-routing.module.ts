import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksPageComponent } from './marks-page.component';
import { Term1Component } from './term1/term1.component';


const routes: Routes = [
  {
    path: '', component: MarksPageComponent,children: [
      {
        path:'',
        component: Term1Component
      },
      {
        path:'term1',
        component: Term1Component
      }

    ] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarksPageRoutingModule { }
