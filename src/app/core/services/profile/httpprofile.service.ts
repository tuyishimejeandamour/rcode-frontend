import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpprofileService {
  private baseurl= AppConfig.apiHost;
  private headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'x-rapidapi-key': '27dd7f29c0msh321da58a9347d0dp1ad8dajsn32ddd44769d1',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'useQueryString': 'true'
  }

  private requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  };

  constructor(private http:HttpClient) { }

  getinspiration(id:number):Observable<any>{
    return this.http.get(`${this.baseurl}/inspiration/${id}`);
  }
  compilecode(data:{source_code: string, language_id: number,stdin:string}):Observable<any>{
    return this.http.post('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*',data,this.requestOptions)
  }
  runcode(token:string):Observable<any>{
    return this.http.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`,this.requestOptions)
  }
  getcodelanguages():Observable<any>{
    return this.http.get('https://judge0-ce.p.rapidapi.com/languages',this.requestOptions)

  }
}
