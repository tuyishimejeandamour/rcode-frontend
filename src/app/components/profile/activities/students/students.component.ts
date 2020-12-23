import {Component, OnInit, ViewChild,Inject, HostListener, EventEmitter} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpactivitiesService, JerwisService, User } from 'app/core/services';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';


export interface DialogData {
  email: string;
  class: string;
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
  dataSource = new MatTableDataSource<Students>();
  studentsin: marksofstudent[]= [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth <= 1000) ? this.isOpen = true : this.isOpen = false;
  }
  ngOnInit(): void {
    this.getStudent(this.User.getUser().id);
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  doFilter (value: string): void{
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  registerstudent(data:any):void{
    if ( data.student_id && data.classname) {
      this.Httpact.setStudent(data).subscribe(
        (data)=>this.getStudent(this.User.getUser().id),
        error=>console.log(error)
      )
    }

  }
  getStudent(id:number):void{
    this.Httpact.getStudent(id).subscribe(
      (data)=>{this.dataSource.data = data as Students[]},
      error=>console.log(error)
    )
  }
  findmarks(id:number):void{
    this.Httpact.getStudentmarks(id).subscribe(
      (data)=>this.studentsin = data,
      error=>console.log(error)
    )
  }
  constructor(
    public dialog: MatDialog,
    public Httpact:HttpactivitiesService,
    public User:JerwisService
  ) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      hasBackdrop: false,
      panelClass:'newstudent'

    });

    dialogRef.afterClosed().subscribe(result => {
      this.registerstudent(result)
    });
  }

}



export interface Students{
  id: number;
  name: string;
  username: string;
  class: string;

}
export interface marksofstudent{
  taskname: string;
  marks: string;
  lesson: string;
}

const ELEMENT_DATA= [
  {
    id: 1,
    names: 'tuyishime jeandamour',
    username: 'jaylove',
    class: 'class1',
  },
  {
    id:2,
    names: 'tuyishime jeandamour',
    username: 'jaylove',
    class: 'class1',
    // description:[
    //   {
    //     taskname: 'userfunction',
    //     marks: '20/40',
    //     lesson: 'C',
    //   },
    //   {
    //     taskname: 'userfunction',
    //     marks: '20/40',
    //     lesson: 'C',
    //   },
    //   {
    //     taskname: 'userfunction',
    //     marks: '20/40',
    //     lesson: 'C',
    //   },
    //   {
    //     taskname: 'userfunction',
    //     marks: '20/40',
    //     lesson: 'C',
    //   },
    //   {
    //     taskname: 'userfunction',
    //     marks: '20/40',
    //     lesson: 'C',
    //   },
    //   {
    //     taskname: 'userfunction',
    //     marks: '20/40',
    //     lesson: 'C',
    //   },
    //   {
    //     taskname: 'userfunction',
    //     marks: '20/40',
    //     lesson: 'C',
    //   },
    //   {
    //     taskname: 'userfunction',
    //     marks: '20/40',
    //     lesson: 'C',
    //   },
    //   {
    //     taskname: 'userfunction',
    //     marks: '20/40',
    //     lesson: 'C',
    //   }
    // ]
  },
];
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {

  public stud =
  {
    teacher_id: this.User.getUser().id,
    student_id:null,
    classname:null,

  }
  cities2 = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys'}
  ];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private User:JerwisService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)
  {}
  peopleTypeahead = new EventEmitter<string>();
  serverSideFilterItems = [];
  selectedPeople;
  ngOnInit(): void {
    this.serverSideSearch();

  }

  private serverSideSearch() {
    this.peopleTypeahead.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap(term =>
      {
        return this.User.findusers(term);

      }
      )
    ).subscribe(x => {
      this.serverSideFilterItems = [];
      this.serverSideFilterItems.push(x);
    }, (err) => {
      this.serverSideFilterItems = [];
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

