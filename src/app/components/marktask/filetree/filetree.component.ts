import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeData } from 'app/Service/filetree.service';
import { of } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-filetree',
  templateUrl: './filetree.component.html',
  styleUrls: ['./filetree.component.scss']
})
export class FiletreeComponent implements OnInit {
  @Input() nestedDataSource: TreeData[];
  @Output() elementadd = new EventEmitter();
  @Output() activestudent = new EventEmitter();
  public toppx: number;
  getcode(code: TreeData): void {
    this.elementadd.emit(code)

  }
  activestudentfx(file: TreeData): void {
    this.activestudent.emit(file);
  }

  constructor() { }

  ngOnInit(): void {
  }
  test(data: TreeData): void {
    console.log(data.properties.padding)
  }
  getChildren = (node: TreeData): any => of(node.children);
  nestedTreeControl = new NestedTreeControl(this.getChildren);
  hasChild(_: number, node: TreeData): boolean {
    return node.children != null && node.children.length > 0;
  }
  addpadding(node: TreeData): void {
    node.children.forEach(element => {

      if (element.children != null && element.children.length > 0) {
        element.properties.padding = node.properties.padding + 12
      } else {
        element.properties.padding = node.properties.padding + 8
      }
    });
  }
  getfileextension(value: string): string {
    const ext = value.split('.').pop();
    const fileclass = "file-ext-" + ext;
    return fileclass;
  }
}
