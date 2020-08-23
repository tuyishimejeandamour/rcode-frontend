import { Component,  ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { MatDialog } from '@angular/material/dialog';
import { FileElement } from 'app/Service/fileservices.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnChanges {
  public discdetail:FileElement;

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  
  constructor(
    private contextMenuService: ContextMenuService,
    public dialog: MatDialog
  ) { }
 
 
 

  @Input() fileElements: FileElement[];
  @Input() canNavigateUp: string;
  @Input() path: string;

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>();
  @Output() navigatedUp = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {}

  deleteElement(element: FileElement):void {
    this.elementRemoved.emit(element);
  }

  navigate(element: FileElement):void {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp():void {
    this.navigatedUp.emit();
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

  openRenameDialog(element: FileElement):void {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.elementRenamed.emit(element);
      }
    });
  }

  

  onContextMenu($event: any, item: FileElement): void {
    this.contextMenuService.show.next({
      contextMenu: this.basicMenu,
      event: $event,
      item: item

    });
    $event.preventDefault();
    $event.stopPropagation();
    this.rotate($event, 'filecontainer',item)
  
  }
  rotate(event: any, classname: string,item: FileElement): void{
    const tablinks = document.getElementsByClassName(classname);
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("activefile", "");
    }
    event.currentTarget.className += " activefile";
    this.showdetails(item)
  }
  showdetails(element:FileElement):void{
    this.discdetail= element;

  }
}

