import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpmarksService {
  private baseurl = AppConfig.apiHost;

  constructor(private http: HttpClient) { }
  getmarks(term1: number): Observable<any> {
    return this.http.get(`${this.baseurl}/marks/${term1}`);
  }

  givemarks(data: { user_id: number, marks: number, task_id: number }): Observable<any> {
    return this.http.post(`${this.baseurl}/marks`, data);

  }
  getyourstudents(id: number): Observable<any> {
    return this.http.get(`${this.baseurl}/pupils/${id}`);
  }
  getfeedback(data: { task_id: number; sender_id: number; reciever_id: number }): Observable<any> {
    return this.http.post(`${this.baseurl}/feedbacks`, data);
  }
  setfeedback(savefeedback: { task_id: number; sender_id: number; reciever_id: any; feedback: any; }): Observable<any> {
    return this.http.post(`${this.baseurl}/feedback`, savefeedback);
  }
  getAllYouClass(id:number):Observable<any>{
    return this.http.get(`${this.baseurl}/classes/${id}`)

  }
}
