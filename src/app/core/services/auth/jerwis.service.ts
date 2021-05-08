/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { AppConfig } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JerwisService {
  private baseurl = AppConfig.apiHost;
  private userdetails: User = null;

  constructor(
    private http: HttpClient,
    private token: TokenService
  ) { }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  signup(data: any) {
    return this.http.post(`${this.baseurl}/signup`, data);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  login(data) {
    return this.http.post(`${this.baseurl}/login`, data);
  }
  reset(data) {
    return this.http.post(`${this.baseurl}/resetPasswordEmail`, data);

  }
  newpasswordIn(data) {
    return this.http.post(`${this.baseurl}/newPasswordEmail`, data);
  }
  fileinit(data) {
    return this.http.post(`${this.baseurl}/newPasswordEmail`, data);
  }

  getaskcontent(value: number) {
    return this.http.get(`${this.baseurl}/taskcontent/${value}`);
  }
  updatetask(values) {
    return this.http.put(`${this.baseurl}/updatetask`, values)
  }
  findusers(values: string): Observable<any> {
    const stringsearch = `{"email_or_name":"${values}"}`;
    const value = JSON.parse(stringsearch);
    return this.http.post(`${this.baseurl}/users-student`, value)
  }
  setuser(value: User, image: string): void {
    this.setUser(value, image);
    this.userdetails = this.get();
  }
  getUser(): User {
    this.userdetails = this.get();
    return this.userdetails;
  }
  setUser(user: User, image: string) {
    user.profileImage = image;
    sessionStorage.setItem('currentuser', JSON.stringify(user));
  }
  get(): any {
    const userj = sessionStorage.getItem('currentuser');
    return JSON.parse(userj);
  }
}

export interface ContentShow {
  taskname: string,
  short_desc: string,
  long_desc: string
}
export interface User {
  created_at: Date,
  email: string,
  email_verified_at: any,
  firstname: string,
  id: number,
  lastname: string,
  updated_at: Date,
  username: string,
  profileImage?: string
}
