import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarktaskRoutingModule } from './marktask-routing.module';
import { MarktaskComponent } from './marktask.component';
import { SharedModule } from 'app/shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { MaterialModule } from 'app/material/material.module';
import { SelectstudentComponent } from './selectstudent/selectstudent.component';
import { FiletreeComponent } from './filetree/filetree.component';
import { GivemarksComponent } from './givemarks/givemarks.component';
import { FilenamePipe } from 'app/core/pipes/filename.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({

  declarations: [MarktaskComponent, SelectstudentComponent, FiletreeComponent, GivemarksComponent],
  imports: [
    CommonModule,
    MarktaskRoutingModule,
    SharedModule,
    AngularSplitModule,
    BrowserModule,
    FormsModule,
    MonacoEditorModule,
    MaterialModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  entryComponents:[GivemarksComponent],
  providers:[FilenamePipe]


})
export class MarktaskModule { }
