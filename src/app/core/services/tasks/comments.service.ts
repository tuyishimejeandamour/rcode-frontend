import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'environments/environment';
import { Observable } from 'rxjs';
export interface Message {
  image: string;
  id?:number;
  issue_id:number;
  author: string;
  authorStatus: string;
  text: string;
  date: Date;
  relys: Message[];
  relyOpen:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseurl= AppConfig.apiHost;
  constructor(private http:HttpClient ) { }
  gettaskissues(id:number):Observable<any>{
    return this.http.get(`${this.baseurl}/comment/${id}`);
  }
  reporttaskissues(issue:{task_id:number,user_id:number,comment:string,issue_id:number}):Observable<any>{
    return this.http.post(`${this.baseurl}/comment`,issue);
  }

}

