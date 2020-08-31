
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { v4 } from 'uuid';
import { FileElement } from './fileservices.service';
export interface Breadcrumb {
  id?: string;
  element:FileElement;

}
export interface IFileService {
  add(Breadcrumb: Breadcrumb);
  home(id: string);
  update(id: string, update: Partial<Breadcrumb>);
  queryInFolder(folderId: string): Observable<Breadcrumb[]>;
  get(id: string): Breadcrumb;
}


@Injectable({
  providedIn: 'root'
})
export class PathService implements IFileService {
  private map = new Map<string, Breadcrumb>();

  constructor() {}

  add(Breadcrumb: Breadcrumb): Breadcrumb {
    Breadcrumb.id = v4();
    this.map.set(Breadcrumb.id, this.clone(Breadcrumb));
    return Breadcrumb;
  }

  home(id: string): void {
    this.map.delete(id);
  }

  update(id: string, update: Partial<Breadcrumb>): void {
    let element = this.map.get(id);
    element = Object.assign(element, update);
    this.map.set(element.id, element);
  }

  private querySubject: BehaviorSubject<Breadcrumb[]>;
  queryInFolder(): Observable<Breadcrumb[]> {
    const result: Breadcrumb[] = [];
    this.map.forEach(element => {
      result.push(this.clone(element));
    });
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result);
    } else {
      this.querySubject.next(result);
    }
    return this.querySubject.asObservable();
  }

  get(id: string): Breadcrumb {
    return this.map.get(id);
  }

  clone(element: Breadcrumb):any {
    return JSON.parse(JSON.stringify(element));
  }
}
