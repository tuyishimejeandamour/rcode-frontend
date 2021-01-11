import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from './profile.component';
import { FileExplorerComponent, newReminderComponent } from './file-explorer/file-explorer.component';
import { MaterialModule } from 'app/material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { ContextMenuModule } from 'ngx-contextmenu';
import { ExplorerComponent } from './file-explorer/explorer/explorer.component';
import { ModalComponent } from './file-explorer/explorer/modal/modal.component';
import { CoreModule } from 'app/core/core.module';
import { DialogComponent } from './file-explorer/dialog/dialog.component';
import { IssuesComponent } from './file-explorer/dialog/issues/issues.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { ShortenttextPipe } from 'app/core/pipes/shortenttext.pipe';




@NgModule({
  declarations: [ ProfileComponent, FileExplorerComponent, ExplorerComponent,ModalComponent, DialogComponent, IssuesComponent,newReminderComponent, ShortenttextPipe],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule,

    MatIconModule,
    CoreModule,
    ContextMenuModule.forRoot({
      autoFocus: true,
    }),
    QuillModule.forRoot(),
  ],
  entryComponents: [ModalComponent,newReminderComponent]
})
export class ProfileModule { }
