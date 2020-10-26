import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Marks } from '..';


@Injectable({
  providedIn: 'root'
})
export class HttpmarksService {
  private baseurl="http://127.0.0.1:8000/api";

  constructor( private http: HttpClient) { }
  private querySubject: BehaviorSubject<Marks[]>;
  getmarks(term1:number):Observable<Marks[]>{
    // return this.http.get(`${this.baseurl}/marks/${term1}`);
    this.querySubject = new BehaviorSubject( [
      { name: 'db cat1', marks: '30/40', id: 1},
      { name: 'db cat1', marks: '30/40', id: 1},
      { name: 'db cat1', marks: '30/40', id: 1},
      { name: 'db cat1', marks: '30/40', id: 1},
      { name: 'db cat1', marks: '30/40', id: 1},
      { name: 'db cat1', marks: '30/40', id: 1},
      { name: 'db cat1', marks: '30/40', id: 1},
      { name: 'db cat1', marks: '30/40', id: 1},
      { name: 'db cat1', marks: '30/40', id: 1},
    
    ])
    return this.querySubject.asObservable();
  }
  
}
