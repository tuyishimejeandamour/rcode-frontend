import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-term3',
  templateUrl: './term3.component.html',
  styleUrls: ['./term3.component.scss']
})
export class Term3Component implements OnInit {

  
  displayedColumns: string[] = ['position', 'name', 'marks', 'review'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog:MatDialog){
     
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  viewtaskremarks(taskid:number):void {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'80%',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res)
      }
    });
  }
}

export interface PeriodicElement {
  name: string;
  marks: string;
  review: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'db cat1', marks: '30/40', review: 1},
  { name: 'db cat1', marks: '30/40', review: 1},
  { name: 'db cat1', marks: '30/40', review: 1},
  { name: 'db cat1', marks: '30/40', review: 1},
  { name: 'db cat1', marks: '30/40', review: 1},
  { name: 'db cat1', marks: '30/40', review: 1},
  { name: 'db cat1', marks: '30/40', review: 1},
  { name: 'db cat1', marks: '30/40', review: 1},
  { name: 'db cat1', marks: '30/40', review: 1},

];
