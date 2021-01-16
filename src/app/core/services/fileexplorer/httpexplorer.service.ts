import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'environments/environment';
import { Observable } from 'rxjs';
import { JerwisService } from '../auth/jerwis.service';
export default interface FileB{
  type: string,
  path: string,
  timestamp: number,
  size: number,
  basename: string,
  dirname: string,
  extension: string,
  filename: string
}
export interface Properties{
  padding:number;
  active:boolean;
  file?:FileB[];
}
export interface TreeData {
  type: string,
  path: string,
  size?: number,
  extension?: string,
  timestamp: number,
  dirname: string,
  basename: string,
  properties:Properties
  children?: TreeData[];
}


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
    const pathgo = `{"path":"${path}","id":${this.user.getUser().id}}`;
    return this.http.post(`${this.baseurl}/content`,JSON.parse(pathgo))
  }
  getTreeData1(id:number):Observable<any> {
    return this.http.get(`${this.baseurl}/tree/${id}`)
  }

}
