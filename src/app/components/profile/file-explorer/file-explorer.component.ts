import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {  Breadcrumb } from 'app/Service/path.service';
import { ExplorerComponent } from './explorer/explorer.component';
import { v4 } from 'uuid';
import { SnotifyService } from 'ng-snotify';
import { HttpexplorerService, JerwisService, TaskYouHave } from 'app/core/services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { DialogComponent } from './dialog/dialog.component';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { HttptaskService } from 'app/core/services/tasks/httptask.service';
import { Observable } from 'rxjs';
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
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {

  public fileElements: any;
  @ViewChild(ExplorerComponent) private explorer:ExplorerComponent;
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  constructor(
    private filehttp: HttpexplorerService,
    private notify:SnotifyService,
    private dialog:MatDialog,
    private contextMenuService: ContextMenuService,
    private gettasks:HttptaskService,
    private user:JerwisService,
  ) {}

  currentRoot:FolderFile;
  currentPath: Breadcrumb[]=[];
  pathdel:Breadcrumb;
  canNavigateUp = false;
  currenttask:TaskYouHave;
  selectedFiles: any;
  selectedpath:any[] =[];
  currentFile: File;
  progress = 0;
  message = '';
  ischanged= false;
  taskstoworkon = false;
  uploadedtasks = true;
  uploadtasks = true;
  currentselectedtask:TaskYouHave = null;
  taskInThisWeek:Observable<TaskYouHave[]>;
  tasklatesubmits:Observable<TaskYouHave[]>;
  taskInotherweek:Observable<TaskYouHave[]>;

  ngOnInit():void {
    this.gethome();
  }
  gethome():void{
    this.filehttp.getAllFiles().subscribe(
      data => this.fileElements = data,
      error => this.notify.error(`ok enought${<string>error.message}`)
    );
    this.currentPath=[];
  }
  // addFolder(name: string ):void {

  // }

  // removeElement(path:string):void {

  // }

  navigateToFolder(element:FolderFile):void {
    this.filehttp. getfilesinpath(element.path).subscribe(
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

  // moveElement(event: { element: FolderFile; moveTo: FolderFile }):void {

  // }

  // renameElement(element: FolderFile):void {

  // }


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
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'90%',
      height:'90%',
      data: {taskid: id}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res)
      }
    });

  }
  routesubmitt(task:number):void{
    // this.currentselectedtask = task;
    this.taskstoworkon = true;
    this.uploadedtasks = true;
    this.uploadtasks = false;
  }

  filtertasks(choice:number):void{
    if(choice == 1){
      this.gettasks.gettasksinthisweek(this.user.getUser().id,choice).subscribe(
        data=>this.HandleResponse(data),
        error=> this.HandlError(error)
      )
      return;
    }
    if (choice == 2) {
      this.gettasks.gettasksinthisweek(this.user.getUser().id,choice).subscribe(
        data=>this.HandleResponse(data),
        error=> this.HandlError(error)
      )
      return;
    }
    if (choice == 3) {
      this.gettasks.gettasksinthisweek(this.user.getUser().id,choice).subscribe(
        data=>this.HandleResponse(data),
        error=> this.HandlError(error)
      );
      return;
    }
  }
  HandlError(error: { error: { error: any; }; }):void {
    this.notify.error(error.error.error);
  }
  HandleResponse(data:TaskYouHave[]):void{
    this.taskInThisWeek = this.tasks.countdown(data);
  }
  /**
   * uploading functionlities
   */

  uploadfolder(event: { target: { files: any; }; }):void{
    this.selectedFiles = event.target.files;

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.selectedpath[i] = { value: 0, name: this.selectedFiles[i].webkitRelativePath};

    }

  }
  uploadtoserver():void{
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  upload(idx:number,file:any): void {

    this.gettasks.uploadproject(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.selectedpath[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('ok');
        }
      },
      err => {
        this.selectedpath[idx].value = 0;
        this.message = 'Could not upload the file:' + <string>file.webkitRelativePath;
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
    taskid:null,
    setedtime:null,
    comment:null
  }

  constructor(
    public dialogRef: MatDialogRef<newReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private gettask:HttptaskService,
    private notify:SnotifyService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit():void{
    this.Remainder.taskid = this.data;
    this.gettask.setreminder(this.Remainder).subscribe(
      ()=>{this.notify.success('succefull set');this.onNoClick()},
      error=> this.notify.error(error.error.error)
    )
  }
}
