import { HttpClient, HttpEventType } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'environments/environment';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {
  private baseurl= AppConfig.apiHost;
  progress:number;

  constructor(private httpClient: HttpClient) { }
  public upload(data:any, userId:number):any {
    const formData = new FormData();
    formData.append('file', data);
    const uploadURL = `${this.baseurl}/avatar/${userId}`;

    return this.httpClient.post<any>(uploadURL, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          this.progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: this.progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
}
