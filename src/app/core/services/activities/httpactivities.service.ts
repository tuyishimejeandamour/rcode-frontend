/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TasksDetails } from 'app/components/profile/activities/tasks/tasklist/tasklist.component';

@Injectable({
  providedIn: 'root'
})
export class HttpactivitiesService {

  private baseurl="http://192.168.0.30:8000/api";
  constructor(
    private http: HttpClient,
  ) { }

  setStudent(data: any):any{
    return this.http.post(`${this.baseurl}/student`,data);
  }
  getStudent(id:number):any{
    return this.http.get(`${this.baseurl}/student/${id}`);
  }
  settaskactivity(data){
    return this.http.post(`${this.baseurl}/task`,data);
  }
  getask(data: number){
    return this.http.get(`${this.baseurl}/tasks/${data}`);
  }
  getsingletask(id:number):Observable<any>{
    return this.http.get(`${this.baseurl}/task/${id}`);

  }
}
