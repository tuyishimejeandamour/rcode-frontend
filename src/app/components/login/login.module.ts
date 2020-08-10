import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [ CommonModule,LoginRoutingModule,SharedModule,FormsModule,MaterialModule ]
})
export class LoginModule { }
