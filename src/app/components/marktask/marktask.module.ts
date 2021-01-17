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
import { QuillModule } from 'ngx-quill';
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
@NgModule({

  declarations: [MarktaskComponent, SelectstudentComponent, FiletreeComponent, GivemarksComponent, ImageViewerComponent],
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
    PdfViewerModule,
    GalleryModule,
    LightboxModule,
    ImageViewerModule,
    QuillModule.forRoot()
  ],
  entryComponents:[GivemarksComponent],
  providers:[FilenamePipe]


})
export class MarktaskModule { }
