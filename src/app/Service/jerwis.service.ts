/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class JerwisService {
  private baseurl="http://127.0.0.1:8000/api";
  private userdetails : User;
  private defaultuser: User={
    user_id: 1,
    username: 'jaylove',
    firstname: 'tuyishime',
    lastname: 'jeandamour',
    profile_image: '../../../../assets/profile_picture/11594486894.png',
    email: 'tuyishimejeand88@gmail.com'
  }
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
    this.userdetails = value;
  }
  getUser(): User{
    return this.userdetails;
  }
  initfuntion(): void{
    this.setuser(this.defaultuser);
  }
}

export interface ContentShow{
  taskname: string,
  short_desc: string,
  long_desc: string
}
export interface User{
  user_id: number,
  username: string,
  firstname: string,
  lastname: string,
  profile_image: string,
  email: string
}