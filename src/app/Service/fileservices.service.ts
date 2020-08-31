import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { v4 } from 'uuid';
export interface FileElement {
  id?: string;
  isFolder: boolean;
  name: string;
  parent: string;
}
export interface IFileService {
  add(fileElement: FileElement);
  delete(id: string);
  update(id: string, update: Partial<FileElement>);
  queryInFolder(folderId: string): Observable<FileElement[]>;
  get(id: string): FileElement;
}


@Injectable({
  providedIn: 'root'
})
export class FileservicesService implements IFileService {
  private map = new Map<string, FileElement>();

  constructor() {}

  add(fileElement: FileElement): FileElement {
    fileElement.id = v4();
    this.map.set(fileElement.id, this.clone(fileElement));
    return fileElement;
  }

  delete(id: string): void {
    this.map.delete(id);
  }

  update(id: string, update: Partial<FileElement>): void {
    let element = this.map.get(id);
    element = Object.assign(element, update);
    this.map.set(element.id, element);
  }

  private querySubject: BehaviorSubject<FileElement[]>;
  queryInFolder(folderId: string): Observable<FileElement[]> {
    const result: FileElement[] = [];
    this.map.forEach(element => {
      if (element.parent === folderId) {
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

  get(id: string): FileElement {
    return this.map.get(id);
  }

  clone(element: FileElement):any {
    return JSON.parse(JSON.stringify(element));
  }
}
