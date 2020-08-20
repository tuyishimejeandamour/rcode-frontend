import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileElement, FileservicesService } from 'app/Service/fileservices.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {

  public fileElements: Observable<FileElement[]>;

  constructor(public fileService: FileservicesService) {}

  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;

  ngOnInit(): void {
    this.fileService.add({ name: 'FolderB', isFolder: true, path: 'root/folderB',mod_date:"2002 may 13:10",size:"20 mb",type:"folder" });

  }
  addFolder(folder: { name: string }):void {
    this.fileService.add({ isFolder: true, name: folder.name, path: this.currentRoot ? this.currentRoot.path : 'root',mod_date:"200",size:"20 kb",type:"folder" });
    this.updateFileElementQuery();
  }

  removeElement(element: FileElement):void {
    this.fileService.delete(element.path);
    this.updateFileElementQuery();
  }

  navigateToFolder(element: FileElement):void {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  navigateUp():void {
    if (this.currentRoot && this.currentRoot.path === 'root') {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.fileService.get(this.currentRoot.path);
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  moveElement(event: { element: FileElement; moveTo: FileElement }):void {
    this.fileService.update(event.element.path, { path: event.moveTo.path });
    this.updateFileElementQuery();
  }

  renameElement(element: FileElement):void {
    console.log(element);
    this.fileService.update(element.path, { name: element.name });
    this.updateFileElementQuery();
  }

  updateFileElementQuery():void {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.path : 'root');
  }

  pushToPath(path: string, folderName: string):string {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string):string {
    let p = path ? path : '';
    const split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }
}
