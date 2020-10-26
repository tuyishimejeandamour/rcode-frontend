import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Marks, HttpmarksService } from 'app/core/services';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-term2',
  templateUrl: './term2.component.html',
  styleUrls: ['./term2.component.scss']
})
export class Term2Component implements OnInit {
  firstmarks:Marks[]=[];
  displayedColumns: string[] = ['position', 'name', 'marks', 'review'];
  dataSource = new MatTableDataSource<Marks>(this.firstmarks);
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog:MatDialog,
              private markser:HttpmarksService,
              private notify:SnotifyService
  ){
     
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getmarks(1);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  viewtaskremarks(taskid:number):void {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'80%',
      data:{task:taskid}
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

