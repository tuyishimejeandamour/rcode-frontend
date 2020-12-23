import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {  Breadcrumb } from 'app/Service/path.service';
import { ExplorerComponent } from './explorer/explorer.component';
import { v4 } from 'uuid';
import { SnotifyService } from 'ng-snotify';
import { HttpexplorerService } from 'app/core/services';
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

  constructor(
    private filehttp: HttpexplorerService,
    private notify:SnotifyService
  ) {}

  currentRoot:FolderFile;
  currentPath: Breadcrumb[]=[];
  pathdel:Breadcrumb;
  canNavigateUp = false;

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
  addFolder(name: string ):void {

  }

  removeElement(path:string):void {

  }

  navigateToFolder(element:FolderFile):void {
    const path = `{"path":"${element.path}"}`;
    this.filehttp. getfilesinpath(JSON.parse(path)).subscribe(
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

  }

  renameElement(element: FolderFile):void {

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

}
