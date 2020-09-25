import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPasswordRoutingModule } from './new-password-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { NewPasswordComponent } from './new-password.component';



@NgModule({
  declarations: [NewPasswordComponent],
  imports: [
    CommonModule,
    NewPasswordRoutingModule,
    SharedModule
  ]
})
export class NewPasswordModule { }
