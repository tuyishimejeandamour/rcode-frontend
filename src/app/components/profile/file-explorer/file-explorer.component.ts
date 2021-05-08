
import { RemainingTimeService } from './../../../core/services';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {  Breadcrumb } from 'app/Service/path.service';
import { ExplorerComponent } from './explorer/explorer.component';
import { v4 } from 'uuid';
import { SnotifyService } from 'ng-snotify';
import { HttpexplorerService, JerwisService, TaskYouHave } from 'app/core/services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { HttptaskService } from 'app/core/services/tasks/httptask.service';
import { DiscussComponent } from 'app/shared/components/discuss/discuss.component';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import * as JSUnzip  from '../../../../assets/js/JsUnzip'
import * as JSZip from 'jszip';

export interface FolderFile{
  type:string;
  path:string;
  timestamp:number;
  dirname:string;
  basename:string;
  size?:number;
  extension?:string;
  filename?:string;
}

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
  providers:[RemainingTimeService]
})
export class FileExplorerComponent implements OnInit {

  public fileElements: any[];
  @ViewChild(ExplorerComponent) private explorer:ExplorerComponent;
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  constructor(
    private filehttp: HttpexplorerService,
    private notify:SnotifyService,
    private dialog:MatDialog,
    private contextMenuService: ContextMenuService,
    private gettasks:HttptaskService,
    private user:JerwisService,
    private timeremain:RemainingTimeService
  ) {}

  currentRoot:FolderFile;
  currentPath: Breadcrumb[]=[];
  pathdel:Breadcrumb;
  canNavigateUp = false;
  currenttask:TaskYouHave;
  selectedFiles: any;
  selectedpath:any;
  zipedfiles:any[]=[]
  currentFile: File;
  progress = 0;
  message = '';
  ischanged= false;
  taskstoworkon = false;
  uploadedtasks = true;
  uploadtasks = true;
  tooglebetweetask ={
    thisweek:true,
    lastweek:true,
    otherweek:true,
    all:false
  }
  currentselectedtask:TaskYouHave = null;
  tasks:Observable<TaskYouHave[]>;
  taskInThisWeek:Observable<TaskYouHave[]>;
  tasklatesubmits:Observable<TaskYouHave[]>;
  taskInotherweek:Observable<TaskYouHave[]>;

  ngOnInit():void {
    this.gethome();
    this.filtertasks(1);
  }
  tooglearounddiv(name:string):void{
    Object.keys(this.tooglebetweetask).map((key)=>{
      if (key == name) {
        this.tooglebetweetask[key] = !this.tooglebetweetask[key];
      }else{
        this.tooglebetweetask[key] = true;
      }
    });
  }
  gethome():void{
    this.filehttp.getAllFiles().subscribe(
      data => {this.fileElements = data;console.log(this.fileElements)},
      error => this.notify.error(`ok enought${<string>error.message}`)
    );
    this.currentPath=[];
  }
  addFolder(name: string ):void {
    name
  }

  removeElement(path:string):void {
    path
  }

  navigateToFolder(element:FolderFile):void {
    this.filehttp.getfilesinpath(element.path).subscribe(
      data => this.fileElements = data,
      error => this.notify.error(`ok enought${<string>error.message}`
      ));
    this.pushToPath(element);
    this.canNavigateUp = true;
  }
  navigateFromNav(element:Breadcrumb):void{
    this.currentRoot = element.element;
    this.navigateToFolder(element.element);
    this.findindexpath(element)
  }
  navigateUp() :void{

  }

  moveElement(event: { element: FolderFile; moveTo: FolderFile }):void {
    event
  }

  renameElement(element: FolderFile):void {
    element
  }
  activatetask(event: any, classname: string): void{
    const tablinks = document.getElementsByClassName(classname);
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("activetask", "");
    }
    event.currentTarget.className += " activetask";

  }

  pushToPath(element:FolderFile):void{
    this.addnavpath({element: element });

  }
  addnewFolder():void{
    this.explorer.openNewFolderDialog();
  }
  addnavpath(nav:Breadcrumb ):void
  {
    nav.id= v4();
    this.currentPath.push(nav);
  }

  findindexpath(element:Breadcrumb):void{
    const removeIndex = this.currentPath.map(function(item) { return item.id; }).indexOf(element.id);
    this.deletepath(removeIndex)
  }

  deletepath(id:number):void{
    for(let i=this.currentPath.length;i>id+1;i--){
      this.currentPath.splice(this.currentPath.length-1,1);
    }
  }

  /**
   * task functionlities
   */
  onContextMenu($event: MouseEvent, item:TaskYouHave): void {
    this.contextMenuService.show.next({
      contextMenu: this.basicMenu,
      event: $event,
      item: item

    });
    $event.preventDefault();
    $event.stopPropagation();
  }
  showQuestion(id : number):void {
    this.dialog.open(DiscussComponent,{
      width:'90%',
      height:'90%',
      data:{authorized:false,taskid:id}
    });


  }
  routesubmitt(task:TaskYouHave):void{
    this.currentselectedtask = task;
    this.taskstoworkon = true;
    this.uploadedtasks = true;
    this.uploadtasks = false;
  }

  filtertasks(choice:number):void{
    if(choice == 1){
      this.gettasks.gettasksinthisweek(this.user.getUser().id,choice).subscribe(
        data=>this.HandleResponse(data,choice),
        error=> this.HandlError(error)
      )
      return;
    }
    if(choice == 2){
      this.gettasks.gettasksinthisweek(this.user.getUser().id,choice).subscribe(
        data=>this.HandleResponse(data,choice),
        error=> this.HandlError(error)
      )
      return;
    }
    if (choice == 3) {
      this.gettasks.gettasksinthisweek(this.user.getUser().id,choice).subscribe(
        data=>this.HandleResponse(data,choice),
        error=> this.HandlError(error)
      )
      return;
    }
    if (choice == 4) {
      this.gettasks.gettasksinthisweek(this.user.getUser().id,choice).subscribe(
        data=>this.HandleResponse(data,choice),
        error=> this.HandlError(error)
      );
      return;
    }
  }
  HandlError(error: { error: { error: any; }; }):void {
    this.notify.error(error.error.error);
  }
  HandleResponse(data:TaskYouHave[],choice:number):void{
    if (choice == 1) {

      this.tasks = this.timeremain.countdown(data);
    }else if(choice == 2){
      this.taskInThisWeek = this.timeremain.countdown(data);
    }else if(choice == 3){
      this.taskInotherweek = this.timeremain.countdown(data);
    }else if(choice == 4){
      this.tasklatesubmits = this.timeremain.countdown(data);

    }
  }
  /**
   * uploading functionlities
   */
  isfolder(data:string):boolean{
    const lastChar = data.substr(data.length - 1);
    if (lastChar == '/' || lastChar == '\\') {
      return true;
    }
    return false;

  }
  uploadfolder(event: { target: { files: any; }; }):void{
    this.selectedFiles = event.target.files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(this.selectedFiles);

    reader.onloadend = (e)=>{
      const myZip = e.target.result;
      const zip = new JSZip();
      let test = {
        name:null,
        folder:false
      };
      zip.loadAsync(myZip).then(contents=> {
        Object.keys(contents.files).map((filename)=>{


          const dest ={
            name:filename,
            folder:filename.substr(filename.length - 1) == '/' ? true:false
          };
          if (test.folder && dest.folder) {
            test = dest
          }else{
            test = dest
            this.zipedfiles.push(dest);
          }

          console.log(dest);

        });
      });
    }

    this.selectedpath = { value: 0, name: this.selectedFiles.name,file:this.selectedFiles};

  }

  upload(id:number): void {

    this.gettasks.uploadproject(this.user.getUser().id,id.toString(),this.selectedpath.file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.selectedpath.value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log(event.body)
        }
      },
      err => {
        this.selectedpath.value = 0;
        this.message = 'Could not upload the file:' + <string>this.selectedpath.webkitRelativePath;
      });
  }
  setRemainder(id:number):void{
    const dialogRef = this.dialog.open(newReminderComponent,{
      data:id
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res)
      }
    });
  }
}
@Component({
  selector: 'new-reminder',
  templateUrl: 'new-reminder.html',
})
export class newReminderComponent {
  selectedtime ={
    dateset:null,
    timeset:null,
  }
  Remainder={
    task_id:null,
    user_id:null,
    deadline:null,
    description:null
  }

  constructor(
    public dialogRef: MatDialogRef<newReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private gettask:HttptaskService,
    public datepipe: DatePipe,
    public user:JerwisService,
    private notify:SnotifyService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit():void{
    this.Remainder.task_id = this.data;
    this.Remainder.user_id = this.user.getUser().id;
    this.Remainder.deadline = this.datepipe.transform(new Date( new Date(this.selectedtime.dateset).toLocaleDateString()+" "+new Date(this.selectedtime.timeset).toLocaleTimeString()),'yyyy-MM-dd hh:mm:ss');
    this.gettask.setreminder(this.Remainder).subscribe(
      ()=>{this.notify.success('succefull set');this.onNoClick()},
      error=> this.notify.error(error.error.error)
    )
  }
}
