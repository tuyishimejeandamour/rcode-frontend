import {Component, OnInit, ViewChild,Inject, HostListener, EventEmitter} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpactivitiesService, JerwisService, User } from 'app/core/services';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { concat, Observable, of } from 'rxjs';
import { Subject } from 'rxjs';


export interface DialogData {
  email: string;
  class: string;
}
export interface Groups{
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
  user_id: number;
  year: string;
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
  groups:Groups[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth <= 1000) ? this.isOpen = true : this.isOpen = false;
  }
  constructor(
    public dialog: MatDialog,
    public Httpact:HttpactivitiesService,
    public User:JerwisService
  ) {}
  ngOnInit(): void {
    this.getStudent(this.User.getUser().id);
    this.dataSource.paginator = this.paginator;
    this.getgroups();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  doFilter (value: string): void{
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  registerstudent(data:any):void{
    console.log(data);
    if (data.group_id && data.user_id) {
      this.Httpact.setStudent(data).subscribe(
        (data)=>this.getStudent(this.User.getUser().id),
        error=>console.log(error)
      )
    }

  }

  registergroup(data:{user_id:number,name:string,year:string}):void{
    const pipe = new DatePipe('en-US');
    if (data.name) {
      data.year = pipe.transform(data.year,"yyyy-dd-MM");
      this.Httpact.creategroup(this.User.getUser().id,data).subscribe(
        (data)=>this.getStudent(this.User.getUser().id),
        error=>console.log(error)
      )
    }

  }
  getgroups():void{
    this.Httpact.getgroups(this.User.getUser().id).subscribe(
      data => this.handlethergroups(data),
      error => console.error(error)
    )
  }
  handlethergroups(data:Groups[]):void{
    this.groups = data;
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

  openDialogaddclass(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      panelClass:'newstudent',
      data:{isregister:false}

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(result);
        this.registergroup(result);
      }
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      panelClass:'newstudent',
      data:{isregister:true,groups:this.groups}

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.registerstudent(result);
      }

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

// const ELEMENT_DATA= [
//   {
//     id: 1,
//     names: 'tuyishime jeandamour',
//     username: 'jaylove',
//     class: 'class1',
//   },
//   {
//     id:2,
//     names: 'tuyishime jeandamour',
//     username: 'jaylove',
//     class: 'class1',
//     // description:[
//     //   {
//     //     taskname: 'userfunction',
//     //     marks: '20/40',
//     //     lesson: 'C',
//     //   },
//     //   {
//     //     taskname: 'userfunction',
//     //     marks: '20/40',
//     //     lesson: 'C',
//     //   },
//     //   {
//     //     taskname: 'userfunction',
//     //     marks: '20/40',
//     //     lesson: 'C',
//     //   },
//     //   {
//     //     taskname: 'userfunction',
//     //     marks: '20/40',
//     //     lesson: 'C',
//     //   },
//     //   {
//     //     taskname: 'userfunction',
//     //     marks: '20/40',
//     //     lesson: 'C',
//     //   },
//     //   {
//     //     taskname: 'userfunction',
//     //     marks: '20/40',
//     //     lesson: 'C',
//     //   },
//     //   {
//     //     taskname: 'userfunction',
//     //     marks: '20/40',
//     //     lesson: 'C',
//     //   },
//     //   {
//     //     taskname: 'userfunction',
//     //     marks: '20/40',
//     //     lesson: 'C',
//     //   },
//     //   {
//     //     taskname: 'userfunction',
//     //     marks: '20/40',
//     //     lesson: 'C',
//     //   }
//     // ]
//   },
// ];
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {
  peopleTypeahead = new EventEmitter<string>();
  serverSideFilterItems = [];
  selectedPeople;
  registerstudent:boolean;
  people$: Observable<User[]>;
  peopleLoading = false;
  peopleInput$ = new Subject<string>();
  selectedPersons: User[] = <any>[];
  groupname ={
    user_id:this.User.getUser().id,
    name:null,
    year:Date.now()
  };
  public stud =
  {
    user_id:null,
    group_id:null,

  }
  // cities2 = [
  //   {id: 1, name: 'Vilnius'},
  //   {id: 2, name: 'Kaunas'},
  //   {id: 3, name: 'Pavilnys'}
  // ];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private User:JerwisService,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {}

  ngOnInit(): void {
    this.serverSideSearch();
    this.registerstudent = this.data.isregister;
  }
  trackByFn(item: User):number {
    return item.id;
  }
  private serverSideSearch() {
    this.people$ = concat(
      of([]), // default items
      this.peopleInput$.pipe(
        distinctUntilChanged(),
        tap(() => this.peopleLoading = true),
        switchMap(term => this.User.findusers(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.peopleLoading = false)
        ))
      )
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

