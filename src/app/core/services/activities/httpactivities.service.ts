/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpactivitiesService {

  private baseurl=AppConfig.apiHost;
  constructor(
    private http: HttpClient
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
  getStudentmarks(id:number):Observable<any>{
    return this.http.get(`${this.baseurl}/getstudentmarks/${id}`);

  }
  creategroup(id:number,data:{groupname:string}):Observable<any>{
    return this.http.post(`${this.baseurl}/groups/${id}`,data)

  }
}
