import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() TaskFolder:TreeData[];
  @Output() filtertreedata = new EventEmitter<string>();
  constructor(private treedata:FiletreeService) {

  }

  myControl = new FormControl();
  options: string[]=[];
  filteredOptions: Observable<string[]>;

  ngOnInit():void {
    this.getindex(this.TaskFolder);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  public setdata(data:TreeData[]):void{
    console.log(data)
    this.getindex(data);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private getindex(data:TreeData[]):void{
    const datawchild = data.filter(option => option.children != null && option.children.length > 0);
    datawchild.forEach( data=>{
      this.options.push(data.basename)
    })

  }
  filtertree(name:string):void{
    this.filtertreedata.emit(name);
  }
}
