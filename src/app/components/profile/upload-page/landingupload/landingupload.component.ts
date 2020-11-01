import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskYouHave, User, JerwisService } from 'app/core/services';
import { HttptaskService } from 'app/core/services/tasks/httptask.service';
import { SnotifyService } from 'ng-snotify';
import { DialogData } from '../../activities/students/students.component';

@Component({
  selector: 'app-landingupload',
  templateUrl: './landingupload.component.html',
  styleUrls: ['./landingupload.component.scss']
})
export class LandinguploadComponent implements OnInit {
  user:User;
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  taskInThisWeek:TaskYouHave[]=[];
  tasklatesubmits:TaskYouHave[]=[];
  taskInotherweek:TaskYouHave[]=[];
  date = new Date();
  day = this.date.getDate();
  month = this.date.getMonth();
  year = this.date.getFullYear();
  hour = this.date.getHours();
  minute = this.date.getMinutes();
  constructor(
    private contextMenuService: ContextMenuService,
    private link: Router,
    private dialog:MatDialog,
    private gettask:HttptaskService,
    private jerw:JerwisService,
    private notify:SnotifyService
  ) { }

  ngOnInit(): void {
    this.user = this.jerw.getUser();
    this.gettaskinweek();
    this.getaskinotherweek();
    this.getlatesubmitted();
  }
  onContextMenu($event: MouseEvent, item:TaskYouHave): void {
    this.contextMenuService.show.next({
      contextMenu: this.basicMenu,
      event: $event,
      item: item

    });
    $event.preventDefault();
    $event.stopPropagation();
  }
  showQuestion(task:TaskYouHave):void {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'90%',
      height:'90%',
      data: {taskid: task}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res)
      }
    });

  }

  gettaskinweek():void{

    this.gettask.gettasksinthisweek(this.user.id).subscribe(
      data=>this.HandleResponse(data,this.taskInThisWeek),
      error=> this.HandlError(error)
    )
  }
  getlatesubmitted():void{
    // this.gettask.getunsumitted(this.user.user_id).subscribe(
    //   data=>this.HandleResponse(data,this.tasklatesubmits),
    //   error=> this.HandlError(error)
    // );
    this.tasklatesubmits= [
      {
        taskid:1,
        taskname:'function in javascript',
        lesson:'js',
        remainingdate:'1day 12hr',
        submittiondate:new Date(this.year, this.month, this.day-1, this.hour, this.minute),

      }
    ]
  }
  getaskinotherweek():void{
    this.gettask.gettasksinotherweek(this.user.id).subscribe(
      data=>this.HandleResponse(data,this.taskInotherweek),
      error=> this.HandlError(error)
    );
  }
  HandlError(error: { error: { error: any; }; }):void {
    this.notify.error(error.error.error);
  }
  HandleResponse(data:TaskYouHave[],typetask:TaskYouHave[]):void{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    typetask=data;
  }
  response(data:string):void{
    this.notify.success(data)
  }
  routesubmitt(value:string):void{
    this.link.navigateByUrl(`profile/upload/upload/${value}`)
  // console.log(`profile/upload/upload/:${value}`)
  }
  setRemainder(id:number):void{
    const dialogRef = this.dialog.open(newReminderComponent,{
      data:id
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res)
      }
    });
  }
}
@Component({
  selector: 'new-reminder',
  templateUrl: 'new-reminder.html',
})
export class newReminderComponent {
  Remainder={
    taskid:null,
    setedtime:null,
  }

  constructor(
    public dialogRef: MatDialogRef<newReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private gettask:HttptaskService,
    private notify:SnotifyService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit():void{
    this.Remainder.taskid = this.data;
    this.gettask.setreminder(this.Remainder).subscribe(
      ()=>{this.notify.success('succefull set');this.onNoClick()},
      error=> this.notify.error(error.error.error)
    )
  }
}


