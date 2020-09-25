import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPasswordComponent } from './new-password.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [

  {
    path: "new-password",
    component: NewPasswordComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NewPasswordRoutingModule { }
