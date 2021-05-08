import { Marks, MarksService } from './../../../core/services/marks/marks.service';
import { SnotifyService } from 'ng-snotify';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpmarksService, JerwisService } from 'app/core/services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-marks-page',
  templateUrl: './marks-page.component.html',
  styleUrls: ['./marks-page.component.scss']
})
export class MarksPageComponent implements OnInit,AfterViewInit {
  dataclasses :any[] = []
  firstmarks:Marks[]=[];
  displayedColumns: string[] = ['position', 'name', 'marks', 'review'];
  dataSource = new MatTableDataSource<Marks>(this.firstmarks);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dialog:MatDialog,
    private marks:HttpmarksService,
    private notify:SnotifyService,
    private user:JerwisService,
    private marskServices:MarksService
  ){

  }

  @ViewChild('class_1', {read: ElementRef})  initialclick:ElementRef;


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getmarks(this.user.getUser().id);
    this.getYourClasses();
  }
  ngAfterViewInit(): void {
    this.initialclick.nativeElement.click();
    this.dataSource.sort = this.sort;
  }
  getYourClasses():void{
    this.marks.getAllYouClass(this.user.getUser().id).subscribe(
      data=> this.dataclasses = data,
      error=> this.notify.error(error.error.error)

    )
  }

  viewtaskremarks(taskid:number,user_id:number):void {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'80%',
      data:{authorized:false,taskid:taskid,user:user_id}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res)
      }
    });
  }
  getmarks(t:number):void{
    const id = this.user.getUser().id;
    this.marks.getmarks(id,t).subscribe(
      data=> this.dataSource.data=data,
      error=> this.notify.error(error.error.error)
    )
  }
}




