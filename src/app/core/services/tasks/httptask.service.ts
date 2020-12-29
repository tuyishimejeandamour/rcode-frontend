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

  gettasksinthisweek(data:number):any{
    return this.http.get(`${this.baseurl}/gettasks/thisweek/${data}`);
  }
  getunsumitted(data:number):any{
    return this.http.get(`${this.baseurl}/gettasks/unsubmitted/${data}`);
  }
  gettasksinotherweek(data:number):any{
    return this.http.get(`${this.baseurl}/gettasks/other/${data}`);
  }
  gettask(data:number):any{
    return this.http.get(`${this.baseurl}/gettask/${data}`);

  }
  setreminder(data:unknown):any{
    return this.http.post(`${this.baseurl}/setreminder`,data);
  }
  getsubmitedtask(data:number):Observable<SubmittedTask[]>{
    // return this.http.get(`${this.baseurl}/getsubmitted/${data}`);
    const one:BehaviorSubject<SubmittedTask[]>= new BehaviorSubject([
      {
        taskid:1,
        taskname:'task1',
        giveat:new Date(2020,6,12,5,45,34,200),
        marks:'20/30',
        submitted:new Date(2020,6,15,5,45,34,200),
        files:[
          {
            name:'images.jpg',
            path:'task1/images.jpg'
          },
          {
            name:'images.jpg',
            path:'task1/images.jpg'
          },
          {
            name:'images.jpg',
            path:'task1/images.jpg'
          }
        ]
      }
    ]);
    return one.asObservable();
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

