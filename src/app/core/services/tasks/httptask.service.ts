import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SubmittedTask } from '..';
import { AppConfig } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttptaskService {
  private baseurl= AppConfig.apiHost;

  constructor(private http:HttpClient) { }

  gettasksinthisweek(id:number,data:number):any{
    const choice = `{"choice":${data}}`;
    return this.http.post(`${this.baseurl}/gettasks/thisweek/${id}`,JSON.parse(choice));
  }
  gettask(data:number):any{

    return this.http.get(`${this.baseurl}/gettask/${data}`);

  }
  setreminder(data:unknown):any{
    return this.http.post(`${this.baseurl}/setreminder`,data);
  }
  gettaskcontent(id:number): Observable<any> {
    return this.http.get(`${this.baseurl}/gettaskcontent/${id}`);
  }

  uploadproject(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseurl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}

