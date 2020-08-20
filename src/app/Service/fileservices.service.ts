import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
export interface FileElement {
  
  isFolder: boolean;
  name: string;
  mod_date:string;
  size:string;
  path: string;
  type: string;
}
export interface IFileService {
  add(fileElement: FileElement);
  delete(path: string);
  update(path: string, update: Partial<FileElement>);
  queryInFolder(folderpath: string): Observable<FileElement[]>;
  get(path: string): FileElement;
}

@Injectable({
  providedIn: 'root'
})
export class FileservicesService implements IFileService {
  private map = new Map<string, FileElement>();

  constructor() {}

  add(fileElement: FileElement):FileElement{
    return fileElement;
  }

  delete(path: string):void {
    this.map.delete(path);
  }

  update(path: string, update: Partial<FileElement>):void {
    let element = this.map.get(path);
    element = Object.assign(element, update);
    this.map.set(element.path, element);
  }

  private querySubject: BehaviorSubject<FileElement[]>;
  queryInFolder(folderpath: string): Observable<FileElement[]> {
    const result: FileElement[] = [];
    this.map.forEach(element => {
      if (element.path === folderpath) {
        result.push(this.clone(element));
      }
    });
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result);
    } else {
      this.querySubject.next(result);
    }
    return this.querySubject.asObservable();
  }

  get(path: string):any {
    return this.map.get(path);
  }

  clone(element: FileElement):any {
    return JSON.parse(JSON.stringify(element));
  }
}
