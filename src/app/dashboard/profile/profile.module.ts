import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from './profile.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { MaterialModule } from 'app/material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { ContextMenuModule } from 'ngx-contextmenu';
import { ExplorerComponent } from './file-explorer/explorer/explorer.component';
import { ModalComponent } from './file-explorer/explorer/modal/modal.component';



@NgModule({
  declarations: [ ProfileComponent, FileExplorerComponent, ExplorerComponent, ModalComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MaterialModule,
    MatIconModule,
    ContextMenuModule.forRoot()
  ],
  entryComponents: [ModalComponent]
})
export class ProfileModule { }
