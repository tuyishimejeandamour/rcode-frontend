import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskYouHave } from 'app/core/services';
import { HttptaskService } from 'app/core/services/tasks/httptask.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  task:TaskYouHave;
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
}
