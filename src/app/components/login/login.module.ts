import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [LoginComponent],
  imports: [ CommonModule,LoginRoutingModule,SharedModule,FormsModule,HttpClientModule ]
})
export class LoginModule { }
