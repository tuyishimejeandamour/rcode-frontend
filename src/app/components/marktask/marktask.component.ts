import { Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';
import  { FiletreeService, TreeData } from 'app/Service/filetree.service';
import { MonacoEditorLoaderService } from '@materia-ui/ngx-monaco-editor';
import { filter, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpactivitiesService, HttpmarkeditorService, HttpmarksService, JerwisService, User } from 'app/core/services';
import { TasksDetails } from '../profile/activities/tasks/tasklist/tasklist.component';
import { MatDialog } from '@angular/material/dialog';
import { GivemarksComponent } from './givemarks/givemarks.component';
import { FilenamePipe } from 'app/core/pipes/filename.pipe';
import { AppConfig } from 'environments/environment';

@Component({
  selector: 'app-marktask',
  templateUrl: './marktask.component.html',
  styleUrls: ['./marktask.component.scss']
})
export class MarktaskComponent implements OnInit {
  treeData: TreeData[];
  reserved:TreeData[];
  codes: any[]=[];
  private baseurl=AppConfig.apiHost;
  pdf = "http://192.168.0.96:8000/storage/task/jaylove/good/jaylove/Slides_Unit1.pdf"
  students=[{
    id:null,
    firstname:null,
    lastname:null,
  }];
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent):void {
    if (event.key==="m") {
      this.opendialogy()
    }
  }
  public editor;
  leftSidebarStatus = "c";
  leftSidebarSelected = "";
  leftSidebarSelect = "";
  fileCounter = 1;
  heroId:string;
  task:TasksDetails ={
    task_id: null,
    taskname: null,
    lesson:null,
    class: null,
    givenat: null,
    endat: null,
  };
  public marks={
    higscore:null,
    score:null
  }
  public markform={
    task_id:null,
    teacher_id:this.user.getUser().id,
    student_id:null,
    marks:null
  }

  constructor( treedata:FiletreeService,
               private monacoLoaderService: MonacoEditorLoaderService,
               private route: ActivatedRoute,
               private user: JerwisService,
               private dialog:MatDialog,
               private http:HttpactivitiesService,
               private httpmark:HttpmarksService,
               private markeditor:HttpmarkeditorService,
               private extension:FilenamePipe

  ) {

    this.treeData = treedata.getTreeData1();
    this.reserved = this.treeData;
    this.heroId = this.route.snapshot.paramMap.get('id');
    this.gettasktomark(<number><unknown>this.heroId);
  }
  filterTree(name:string):void{
    this.treeData = this.reserved.filter(data => data.basename == name);
  }
  split: SplitComponent;
  area1: SplitAreaDirective;
  area2: SplitAreaDirective;

  direction = 'horizontal';
  play=false;
  terminal=false;
  sizes = {
    percent: {
      area1: 3.7,
      area2: 96.3,
    },
    percent2: {
      area1: 50,
      area2: 50,
    }
  }
  dragEnd({sizes}):void {

    this.sizes.percent.area1 = sizes[0];
    this.sizes.percent.area2 = sizes[1];
  }
  drag2End({sizes}):void {
    this.sizes.percent2.area1 = sizes[0];
    this.sizes.percent2.area2 = sizes[1];
  }



  ngOnInit(): void {
    document.getElementById('defaultopen').click();
    this.getstudents(this.user.getUser().id);
  }
  ngAfterViewInit(): void {

  }

  /**
   * sidebar functions
   */
  hideSection(evt:any, section_id:string, icon_id:string):void {
    const selectedElement = document.getElementById(section_id);
    const selectedIcon = document.getElementById(icon_id);
    if (evt.currentTarget.className.toString().split(' ').pop() != "hidden") {
      selectedElement.style.display = "none";
      evt.currentTarget.className += " hidden";
      selectedIcon.style.transform = " rotate(-90deg)";
    } else {
      selectedElement.style.display = "block";
      evt.currentTarget.className = evt.currentTarget.className.replace(" hidden", "");
      selectedIcon.style.transform = "";
    }
  }
  clickLeftNav(evt:any, sidebarName:string):void {
    let i;
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }

    document.getElementById(sidebarName).style.display = "block";

    const tablinks = document.getElementsByClassName("left-nav-button");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";

    //控制sidebar的开关，因为closeLeftSideBar()内的语句，本节代码和上一节顺序不可对调
    this.leftSidebarSelected = this.leftSidebarSelect;
    this.leftSidebarSelect = sidebarName;
    if (this.leftSidebarStatus == "c") {
      this.openLeftSideBar();
      this.leftSidebarStatus = "o";
    } else if (this.leftSidebarSelected == this.leftSidebarSelect) {
      this.closeLeftSideBar();
      this.leftSidebarStatus = "c"
      this.leftSidebarSelect = "";
    }
  }

  openLeftSideBar():void {
    document.getElementById("left-sidebar").style.width = "calc(100% - 50px)";
    const conta = document.getElementsByClassName("container");
    for (let i = 0; i < conta.length; i++) {
      (conta[i] as HTMLElement).style.left = "300px";
    }
    this.sizes.percent.area1 = 20;
    this.sizes.percent.area2 = 80;
  }

  closeLeftSideBar():void {
    document.getElementById("left-sidebar").style.width = "0";
    const conta = document.getElementsByClassName("container");

    for (let i = 0; i < conta.length; i++) {
      (conta[i] as HTMLElement).style.left = "50px";
    }
    this.sizes.percent.area1 = 3.7;
    this.sizes.percent.area2 = 96.3;
    let tablinks;
    // eslint-disable-next-line prefer-const
    tablinks = document.getElementsByClassName("left-nav-button");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

  }
  /**
   * editor functions
   * @type rcode editor
   */
  filearrays:TreeData[]=[];
  activeindex:number;

  setcode(data:TreeData):boolean{
    const num=this.filearrays.indexOf(data,1)
    if(num <0){
      this.filearrays.push(data);
      return true;
    }else{
      return false
    }
  }
  getiffileopened(data:TreeData):boolean{
    if (this.codes.length>0) {
      console.log(this.codes)
      const file =  this.codes.filter((code)=> code.path === data.path)
      return file.length >0 ? true:false;
    }else{
      return false;
    }


  }

  addFile(data:TreeData):void{
    if (!this.getiffileopened(data) && data.extension != "pdf" && data.extension != "doc") {
      this.markeditor.getcode(data.path,this.user.getUser().id).subscribe(
        data=> this.codes.push(data),
        error => console.log(error)
      );
    }else if(!this.getiffileopened(data) && data.extension == "pdf" || data.extension == "doc"){
      const str = data.path.replace("public/", "");
      const url = this.baseurl.replace("api","")
      const pathname = `{"path":"${data.path}","code":"${url}storage/${str}"}`;
      this.codes.push(JSON.parse(pathname));
    }
    if(this.setcode(data)){
      this.activeindex=this.filearrays.indexOf(data,1);
    }
    if(this.filearrays.length==0){
      this.activeindex = 0;
    }
  }
  switchtab(index:number,data:TreeData):void{
    this.monacoLoaderService.isMonacoLoaded$.pipe(
      filter(isLoaded => isLoaded),
      take(1),
    ).subscribe(() => {
      monaco.editor.setModelLanguage(
        monaco.editor.getModels()[index-1],
        this.fileTypes[ this.extension.transform(data.path)]
      );

    });
  }
  closetab(index:number):void{
    this.filearrays.splice(index,1);
    if(index == this.activeindex){
      if(index==0){
        this.activeindex = index;
      }else{
        this.activeindex = index -1;

      }
    }else if(index<this.activeindex){
      this.activeindex -=1;
    }
  }
  openCity(evt, cityName:string):void {
    let i:number;
    const tabcontent = Array.from(document.getElementsByClassName("tabcontentM") as  HTMLCollectionOf<HTMLElement>);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    const tablinks =  Array.from(document.getElementsByClassName("action-label") as  HTMLCollectionOf<HTMLElement>)
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

  }

  gettasktomark(id:number):void{

    this.http.getsingletask(id).subscribe(
      (data)=>this.task=data,
      error=>console.log(error)
    )
  }
  combinemarks(va1:number,va2:number):string{
    return `${va1}/${va2}`;
  }
  markstudent():void{
    this.markform.task_id = this.task.task_id;
    this.markform.marks = this.combinemarks(this.marks.score,this.marks.higscore);
    this.httpmark.givemarks(this.markform).subscribe(
      ()=>console.log('ok'),
      error=>console.log(error)
    )
  }
  getstudents(id:number):void{
    this.httpmark.getyourstudents(id).subscribe(
      (data)=>this.students = data,
      error=>console.log(error)
    )
  }
  opendialogy():void{
    this.dialog.open(GivemarksComponent,{
      width:"40%"
    });

  }
  fileTypes: {
    css: 'css',
    js: 'javascript',
    json: 'json',
    md: 'markdown',
    mjs: 'javascript',
    ts: 'typescript',
  }
}
