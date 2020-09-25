import {Component, OnInit, ViewChild,Inject, HostListener} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('openClose', [
      state('open', style({
        display: 'block',
      })),
      state('closed', style({
        display: 'none',
      })),
      transition('open <=> closed', [
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),

    ]),
  ],
})
export class StudentsComponent implements OnInit {
  hidden = false;
  isOpen = false;
  
  toggle(): void {
    this.isOpen = !this.isOpen;
  }
  toggleBadgeVisibility():void {
    this.hidden = !this.hidden;
  }
  expandedElement: string;
  displayedColumns: string[] = ['Number', 'names', 'username', 'class'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth <= 1000) ? this.isOpen = true : this.isOpen = false;
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  doFilter (value: string): void{
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      hasBackdrop: false,
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}



export interface PeriodicElement {
  names: string;
  username: string;
  class: string;
  description: marksofstudent[];
}
export interface marksofstudent{
  taskname: string;
  marks: string;
  lesson: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    names: 'tuyishime jeandamour',
    username: 'jaylove',
    class: 'class1',
    description:[
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      }
    ]
  }, 
  {
    names: 'tuyishime jeandamour',
    username: 'jaylove',
    class: 'class1',
    description:[
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      },
      {
        taskname: 'userfunction',
        marks: '20/40',
        lesson: 'C',
      }
    ]
  }, 
];
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

