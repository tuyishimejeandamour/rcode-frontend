import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonfunctionService } from 'app/Service/commonfunction.service';
import { JerwisService, ContentShow, HttpactivitiesService } from 'app/core/services';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Console } from 'console';
import { DialogComponent } from 'app/components/profile/marks-page/dialog/dialog.component';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})

export class TasklistComponent implements OnInit {
  public content:ContentShow;
  public showtaskcontent = false;
  displayedColumns: string[] = ['position', 'name', 'classname', 'starting_date', 'submittion_deadline', 'action'];
  dataSource = new MatTableDataSource<TasksDetails>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  constructor(
    private eventEmitterService: CommonfunctionService,
    private jerwis:JerwisService,
    private activity:HttpactivitiesService,
    private contextMenuService: ContextMenuService,
    private dialog:  MatDialog,
    private route:Router

  ){

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeFirstComponentFunction.subscribe((name:string) => {
          this.doFilter(name);
        });

    }
    if(this.eventEmitterService.subsVar2 ==undefined){
      this.eventEmitterService.subsVar2 = this.eventEmitterService.
        invokegettaskfunction.subscribe(() => {
          this.getalltsk(this.jerwis.getUser().id);
        });
    }
    this.getalltsk(this.jerwis.getUser().id);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  doFilter (value: string): void{
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  getalltsk(id:number):void{
    this.activity.getask(id).subscribe(
      (data)=> this.responsehandler(data),
      error=> this.errorhandler(error)
    )
  }
  marktask(id:number):void{
    this.route.navigateByUrl(`marktask/${id}`)
  }
  changeappeareanceofeditor(value: boolean): void{
    this.showtaskcontent = value;
  }
  responsehandler(data): void{
    this.dataSource.data = data as TasksDetails[];
  }
  errorhandler(error): void{
    console.log(error)
  }
  getcontent(value: number):void{
    this.jerwis.getaskcontent(value).subscribe(
      (data)=> this.handleresponsec(data) ,
      error=> this.errorhandler(error)
    )
  }

  handleresponsec(data):void{
    this.content = data;
    document.getElementById("displaycontent").innerHTML= this.content[0].long_desc;
    document.getElementById("displayshortdiscription").innerHTML= this.content[0].short_desc;
    this.showtaskcontent = true;
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

  openDialog(obj:TasksDetails): void {
    obj.givenat = new Date(obj.givenat);
    obj.endat = new Date(obj.endat);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      hasBackdrop: false,
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateRowData(result.data);

    });
  }
  opencontentDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width:'80%',
      data:{authorized:true,taskid:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  updateRowData(obj:TasksDetails):void{
    this.jerwis.updatetask(obj,obj.task_id).subscribe(
      (data)=> {console.log(data)},
      (error)=>this.errorhandler(error)
    )
  }

}

export interface TasksDetails {
  task_id: number;
  taskname: string;
  lesson:string;
  class: string;
  givenat: Date;
  endat: Date;
}
export interface ContentDetails {
  taskname: string;
  classname: string;
  starting_date: string;
  ending_date: string;
}

@Component({
  selector: 'task-edit-dialog',
  templateUrl: 'task-edit-dialog.html',
})
export class DialogOverviewExampleDialog {
  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data:TasksDetails) {
    this.local_data = {...data};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  doAction(): void{
    this.dialogRef.close({data:this.local_data})
  }
}

