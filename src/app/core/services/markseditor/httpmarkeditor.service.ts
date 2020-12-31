import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpmarkeditorService {
  private baseurl=AppConfig.apiHost;
  constructor(
    private http: HttpClient
  ) { }

  getcode(path:string,id:number):Observable<any>{
    const pathname = `{"path":"${path}"}`;
    return this.http.post(`${this.baseurl}/file/content/${id}`,JSON.parse(pathname));
  }
}
