import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable} from 'rxjs';
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
    return this.http.post(`${this.baseurl}/remainder`,data);
  }
  getreminder(id:number):any{
    return this.http.get(`${this.baseurl}/remainder/${id}`);
  }

  gettaskcontent(id:number): Observable<any> {
    return this.http.get(`${this.baseurl}/gettaskcontent/${id}`);
  }

  uploadproject(id:number,taskid:string,file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('taskzip', file);
    formData.append('taskid', taskid);

    const req = new HttpRequest('POST', `${this.baseurl}/uploadtask/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}

