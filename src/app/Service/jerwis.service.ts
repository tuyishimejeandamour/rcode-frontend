/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class JerwisService {
  private baseurl="http://127.0.0.1:8000/api";
  constructor(
    private http: HttpClient,
    private token: TokenService
  ) { }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  signup(data: any){
    return this.http.post(`${this.baseurl}/signup`,data);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  login(data){
    return this.http.post(`${this.baseurl}/login`,data);
  }
  reset(data){
    return this.http.post(`${this.baseurl}/resetPasswordEmail`,data);

  }
  newpasswordIn(data){
    return this.http.post(`${this.baseurl}/newPasswordEmail`,data);
  }
  settaskactivity(data){
    return this.http.post(`${this.baseurl}/task`,data);
  }
  getask(data: number){
    return this.http.get(`${this.baseurl}/tasks/${data}`);
  }
  getuserDetails(){
    return this.http.post(`${this.baseurl}/me`,{
      headers:{Authorization:`bearer ${this.token.get()}`}
    }).subscribe(
      (data)=> this.responsehandler(data),
      error=> this.errorhandler(error)
    );
  }
  responsehandler(data): void{
    console.log(data)
  }
  errorhandler(error): void{
    console.log(error)
  }
  getaskcontent(value: number){
    return this.http.get(`${this.baseurl}/taskcontent/${value}`);
  }
  updatetask(values,id:number){
    return this.http.put(`${this.baseurl}/updatetask/${id}`,values)
  }
}

export interface ContentShow{
  taskname: string,
  short_desc: string,
  long_desc: string
}
