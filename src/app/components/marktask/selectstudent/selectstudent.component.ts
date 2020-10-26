import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FiletreeService, TreeData } from 'app/Service/filetree.service';

@Component({
  selector: 'app-selectstudent',
  templateUrl: './selectstudent.component.html',
  styleUrls: ['./selectstudent.component.scss']
})
export class SelectstudentComponent implements OnInit {
  data:TreeData[];
  @Output() filtertreedata = new EventEmitter<string>();
  constructor(private treedata:FiletreeService) {
    this.data = treedata.getTreeData1();
    this.getindex(this.data);
  }

  myControl = new FormControl();
  options: string[]=[];
  filteredOptions: Observable<string[]>;

  ngOnInit():void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private getindex(data:TreeData[]):void{
    const datawchild = data.filter(option => option.children != null && option.children.length > 0);
    datawchild.forEach( data=>{
      this.options.push(data.name)
    })

  }
  filtertree(name:string):void{
    this.filtertreedata.emit(name);
  }
}
