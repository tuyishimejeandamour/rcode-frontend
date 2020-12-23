import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'environments/environment';
import { Observable } from 'rxjs';
import { JerwisService } from '../auth/jerwis.service';


@Injectable({
  providedIn: 'root'
})
export class HttpexplorerService {

  private baseurl=AppConfig.apiHost;

  constructor(
    private http: HttpClient,
    private user:JerwisService
  ) { }

  getAllFiles():Observable<any>{
    return this.http.get(`${this.baseurl}/content/${this.user.getUser().id}`)
  }
  getfilesinpath(path:string):Observable<any>{
    return this.http.post(`${this.baseurl}/content`,path)
  }

}
