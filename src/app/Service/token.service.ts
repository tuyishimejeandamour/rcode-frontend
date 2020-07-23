/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {
    login: 'http://127.0.0.1:8000/api/login',
    signup: 'http://127.0.0.1:8000/api/signup',

  }
  constructor() {}


  handle(data) {
    this.setToken(data);
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }
  get() {
    return localStorage.getItem('token');
  }
  remove() {
    localStorage.removeItem('token');
  }
  isValid() {
    const token = this.get();
    if (token) {
      const playlod = this.playload(token);
      if (playlod) {
        return Object.values(this.iss).indexOf(playlod.iss)>-1 ? true : false
      }
      return false;
    }
  }
  playload(token) {
    const undecode = token.split('.')[1];

    return this.decoded(undecode);
  }
  decoded(data) {
    return JSON.parse(atob(data));
  }
  loggedin(){
    return this.isValid();
  }
}
