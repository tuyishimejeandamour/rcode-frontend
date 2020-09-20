import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }
  getChildren = (node: TreeData):any => of(node.children);
  nestedTreeControl = new NestedTreeControl(this.getChildren);
  hasChild(_: number, node: TreeData):boolean {
    console.log(node);
    return node.children != null && node.children.length > 0;
  }

}
