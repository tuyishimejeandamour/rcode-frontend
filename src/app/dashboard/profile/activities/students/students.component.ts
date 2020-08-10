import {Component, OnInit, ViewChild,Inject} from '@angular/core';
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
  ],
})
export class StudentsComponent implements OnInit {
  hidden = false;

  toggleBadgeVisibility():void {
    this.hidden = !this.hidden;
  }
  expandedElement: string;
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: marksofstudent[];
}
export interface marksofstudent{
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description:[
      {
        position:1,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
      }
    ]
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description:[
      {
        position:1,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
      }
    ]
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description:[
      {
        position:1,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
      }
    ]
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description:[
      {
        position:1,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
      }
    ]
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description:[
      {
        position:1,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
      }
    ]
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description:[
      {
        position:1,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
      }
    ]
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description:[
      {
        position:1,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
      }
    ]
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description:[
      {
        position:1,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
      }
    ]
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description:[
      {
        position:1,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
      }
    ]
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description:[
      {
        position:1,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
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

