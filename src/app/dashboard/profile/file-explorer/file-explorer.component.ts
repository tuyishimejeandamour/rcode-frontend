import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FileElement, FileservicesService } from 'app/Service/fileservices.service';
import { PathService, Breadcrumb } from 'app/Service/path.service';
import { ExplorerComponent } from './explorer/explorer.component';
import { map } from 'rxjs/operators';
import { v4 } from 'uuid';


@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {

  public fileElements: Observable<FileElement[]>;
  @ViewChild(ExplorerComponent) private explorer:ExplorerComponent;

  constructor(
    public fileService: FileservicesService,
    private pathservise:PathService
  ) {}

  currentRoot: FileElement;
  currentPath: Breadcrumb[]=[];
  pathdel:Breadcrumb;
  canNavigateUp = false;

  ngOnInit():void {
    const folderA = this.fileService.add({ name: 'Folder A', isFolder: true, parent: 'root' });
    this.fileService.add({ name: 'Folder B', isFolder: true, parent: 'root' });
    const folderb = this.fileService.add({ name: 'Folder C', isFolder: true, parent: folderA.id });
    this.fileService.add({ name: 'File t', isFolder: true, parent: folderb.id });
    this.fileService.add({ name: 'File B', isFolder: false, parent: 'root' });

    this.updateFileElementQuery();
  }

  addFolder(folder: { name: string }):void {
    this.fileService.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    this.updateFileElementQuery();
  }

  removeElement(element: FileElement):void {
    this.fileService.delete(element.id);
    this.updateFileElementQuery();
  }

  navigateToFolder(element: FileElement):void {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.pushToPath(element);
    this.canNavigateUp = true;
  }
  navigateFromNav(element:Breadcrumb):void{
    this.currentRoot = element.element;
    this.updateFileElementQuery();
    this.findindexpath(element)
  }
  navigateUp() :void{
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.fileService.get(this.currentRoot.parent);
      this.updateFileElementQuery();
    }
    // this.currentPath = this.popFromPath(this.currentPath);
  }

  moveElement(event: { element: FileElement; moveTo: FileElement }):void {
    this.fileService.update(event.element.id, { parent: event.moveTo.id });
    this.updateFileElementQuery();
  }

  renameElement(element: FileElement):void {
    
    this.fileService.update(element.id, { name: element.name });
    this.updateFileElementQuery();
  }

  updateFileElementQuery():void {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
  }

  pushToPath(element:FileElement):void{
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
    console.log(`id=${id}`);
    console.log(`idx${this.currentPath.length}`);
    for(let i=this.currentPath.length;i>id+1;i--){
      console.log(i)
      this.currentPath.splice(this.currentPath.length-1,1);
      console.log(`idx${this.currentPath.length}`)
    }
  }
  deletepathbyId(index: number):void {     
   

  }
}
