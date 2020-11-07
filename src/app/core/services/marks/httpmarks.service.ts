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
  getmarks(term1:number):Observable<any>{
    return this.http.get(`${this.baseurl}/marks/${term1}`);

  }

  givemarks(data):Observable<any>{
    return this.http.post(`${this.baseurl}/marks`,data);

  }
  getyourstudents(id:number):Observable<any>{
    return this.http.get(`${this.baseurl}/pupils/${id}`);

  }
}
