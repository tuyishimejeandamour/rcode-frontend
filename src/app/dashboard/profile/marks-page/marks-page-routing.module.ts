import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksPageComponent } from './marks-page.component';
import { Term1Component } from './term1/term1.component';
import { Term2Component } from './term2/term2.component';
import { Term3Component } from './term3/term3.component';

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
      ,
      {
        path:'term3',
        component: Term3Component
      }
      ,
      {
        path:'term2',
        component: Term2Component
      }
    ] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarksPageRoutingModule { }
