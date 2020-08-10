import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from './profile.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { MaterialModule } from 'app/material/material.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ ProfileComponent, FileExplorerComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MaterialModule,
    MatIconModule
  ]
})
export class ProfileModule { }
