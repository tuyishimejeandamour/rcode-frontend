import { Component,  ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { MatDialog } from '@angular/material/dialog';
import { FileElement } from 'app/Service/fileservices.service';
import { ModalComponent } from './modal/modal.component';
import { Breadcrumb } from 'app/Service/path.service';
import { FolderFile } from '../file-explorer.component';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnChanges {
  public showdetail = true;
  public fileElements = null;
  public discdetail:any ={
    name: 'Folder A',
    isFolder: true,
    parent: 'root'
  };

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  constructor(
    private contextMenuService: ContextMenuService,
    public dialog: MatDialog
  ) { }

  @Input("fileElements")
  public set value(v : any[]) {
    this.fileElements = v;
  }

  @Input() canNavigateUp: string;
  @Input() path: Breadcrumb[];

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FolderFile>();
  @Output() elementRenamed = new EventEmitter<FolderFile>();
  @Output() navigatedDown = new EventEmitter<FolderFile>();
  @Output() navigateFromNav = new EventEmitter<Breadcrumb>();
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>();
  @Output() navigatedUp = new EventEmitter();
  @Output() gohome = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {}

  deleteElement(element: FolderFile):void {
    this.elementRemoved.emit(element);
  }

  navigate(element: FolderFile):void {
    if (element.type =="dir") {
      this.navigatedDown.emit(element);
    }
  }
  navigatehome():void{
    this.gohome.emit()
  }

  navigateUp():void {
    this.navigatedUp.emit();
  }
  navigateFrom(element: Breadcrumb):void{
    this.navigateFromNav.emit(element)
  }

  moveElement(element: FileElement, moveTo: FileElement):void {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog():void {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
    });
  }

  openRenameDialog(element: FolderFile):void {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.basename = res;
        this.elementRenamed.emit(element);
      }
    });
  }



  onContextMenu($event, item: FolderFile): void {
    this.contextMenuService.show.next({
      contextMenu: this.basicMenu,
      event: $event,
      item: item

    });
    $event.preventDefault();
    $event.stopPropagation();
    this.rotate($event, 'filecontainer',item)
  }
  rotate(event: any, classname: string,item: FolderFile): void{
    const tablinks = document.getElementsByClassName(classname);
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("activefile", "");
    }
    event.currentTarget.className += " activefile";
    this.showdetails(item)
  }
  showdetails(element:FolderFile):void{
    this.showdetail=false;
    this.discdetail= element;

  }
  getfileicons(ext){
    const defaulpath = "../../../../../assets/fileicons/"
    if (ext == 'txt') {
      return defaulpath+"document.svg"
    }else if(ext  == 'php'){
      return defaulpath+"php.svg"
    }else if(ext == 'json'){
      return defaulpath+"json.svg"
    }else{
      return defaulpath+"document.svg"
    }
  }
}

