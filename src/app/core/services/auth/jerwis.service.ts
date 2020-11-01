/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class JerwisService {
  private baseurl="http://192.168.0.30:8000/api";
  private userdetails:User= null;

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

  responsehandler(data): void{
    this.setuser(data);
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
  setuser(value: User) : void{
    this.setUser(value);
    this.userdetails = this.get();
  }
  getUser():User{
    this.userdetails = this.get();
    return this.userdetails;
  }
  setUser(user:User) {
    sessionStorage.setItem('currentuser', JSON.stringify(user));
  }
  get():any {
    const userj = sessionStorage.getItem('currentuser');
    return JSON.parse(userj);
  }
}

export interface ContentShow{
  taskname: string,
  short_desc: string,
  long_desc: string
}
export interface User{
  created_at: Date,
  email: string,
  email_verified_at: any,
  firstname: string,
  id: number,
  lastname: string,
  updated_at: Date,
  username: string
}
