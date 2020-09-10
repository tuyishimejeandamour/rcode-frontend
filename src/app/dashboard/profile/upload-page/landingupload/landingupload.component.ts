import { Component, ViewChild, OnInit } from '@angular/core';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
export interface taskYouHave{
  taskname:string;
  lesson:string;
  remainingdate:string;
  submittiondate:string;
}
@Component({
  selector: 'app-landingupload',
  templateUrl: './landingupload.component.html',
  styleUrls: ['./landingupload.component.scss']
})
export class LandinguploadComponent implements OnInit {

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  taskInThisWeek:taskYouHave[];
  tasklatesubmits:taskYouHave[];
  taskInotherweek:taskYouHave[];

  constructor(
    private contextMenuService: ContextMenuService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.gettaskinweek();
    this.getaskinotherweek();
    this.getlatesubmitted();
  }
  onContextMenu($event: MouseEvent, item: any): void {
    this.contextMenuService.show.next({
      contextMenu: this.basicMenu,
      event: $event,
      item: item

    });
    $event.preventDefault();
    $event.stopPropagation();
  }
  showQuestion():void {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'80%',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res)
      }
    });

  }
  gettaskinweek():void{
    this.taskInThisWeek=[
      {
        taskname:'function in javascript',
        lesson:'js',
        remainingdate:'1day 12hr',
        submittiondate:'13/04/2020'

      },
      {
        taskname:'oop',
        lesson:'jav',
        remainingdate:'1day 12hr',
        submittiondate:'13/04/2020'

      }
    ]
  }
  getlatesubmitted():void{
    this.tasklatesubmits=[
      {
        taskname:'function in javascript',
        lesson:'js',
        remainingdate:'1day 12hr',
        submittiondate:'13/04/2020'

      },
      {
        taskname:'oop',
        lesson:'jav',
        remainingdate:'1day 12hr',
        submittiondate:'13/04/2020'

      },
      {
        taskname:'function in javascript',
        lesson:'js',
        remainingdate:'1day 12hr',
        submittiondate:'13/04/2020'

      },
      {
        taskname:'oop',
        lesson:'jav',
        remainingdate:'1day 12hr',
        submittiondate:'13/04/2020'

      },
      {
        taskname:'function in javascript',
        lesson:'js',
        remainingdate:'1day 12hr',
        submittiondate:'13/04/2020'

      },
      {
        taskname:'oop',
        lesson:'jav',
        remainingdate:'1day 12hr',
        submittiondate:'13/04/2020'

      }
    ]
  }
  getaskinotherweek():void{
    this.taskInotherweek=[]
  }
}
