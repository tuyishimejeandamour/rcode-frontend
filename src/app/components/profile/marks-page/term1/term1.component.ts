import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpmarksService, Marks, JerwisService } from 'app/core/services';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-term1',
  templateUrl: './term1.component.html',
  styleUrls: ['./term1.component.scss']
})
export class Term1Component implements OnInit {
  firstmarks:Marks[]=[];
  displayedColumns: string[] = ['position', 'name', 'marks', 'review'];
  dataSource = new MatTableDataSource<Marks>(this.firstmarks);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog:MatDialog,
              private markser:HttpmarksService,
              private notify:SnotifyService,
              private user:JerwisService
  ){

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getmarks(this.user.getUser().id);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
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
    this.markser.getmarks(t).subscribe(
      data=> this.dataSource.data=data,
      error=> this.notify.error(error.error.error)
    )
  }

}

