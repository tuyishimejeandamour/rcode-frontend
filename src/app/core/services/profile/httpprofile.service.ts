import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpprofileService {
  private baseurl= AppConfig.apiHost;

  constructor(private http:HttpClient) { }

  getinspiration(id:number):Observable<any>{
    return this.http.get(`${this.baseurl}/inspiration/${id}`);
  }
}
