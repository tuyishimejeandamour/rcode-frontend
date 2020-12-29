import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskYouHave } from 'app/core/services';
import { HttptaskService } from 'app/core/services/tasks/httptask.service';
import { SnotifyService } from 'ng-snotify';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  task:TaskYouHave;
  selectedFiles: any;
  selectedpath:any[] =[];
  currentFile: File;
  progress = 0;
  message = '';
  ischanged= false;

  constructor(private dialog:MatDialog,
              private gettasks:HttptaskService,
              private notify: SnotifyService
  ) { }

  ngOnInit(): void {
  }
  showQuestion():void {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'90%',
      height:'90%',
      data: {taskid: this.task}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res)
      }
    });

  }
  gettask(id:number):void{
    this.gettasks.gettask(id).subscribe(
      data=> this.task= data,
      error=>this.notify.error(error.error.error)
    )
  }
  uploadfolder(event):void{
    this.selectedFiles = event.target.files;

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.selectedpath[i] = { value: 0, name: this.selectedFiles[i].webkitRelativePath};

    }

  }
  uploadtoserver(files:any):void{
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  upload(idx:number,file): void {

    this.gettasks.uploadproject(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.selectedpath[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('ok');
        }
      },
      err => {
        this.selectedpath[idx].value = 0;
        this.message = 'Could not upload the file:' + <string>file.webkitRelativePath;
      });
  }
}
