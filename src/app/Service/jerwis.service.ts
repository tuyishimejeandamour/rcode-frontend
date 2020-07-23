import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JerwisService {
  private baseurl="http://127.0.0.1:8000/api";
  constructor( private http: HttpClient) { }

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
}
