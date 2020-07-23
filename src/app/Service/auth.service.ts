import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedin = new BehaviorSubject<boolean>(this.Token.loggedin());
  authStatus= this.loggedin.asObservable();
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  changeAuthStatus(value:boolean){
    this.loggedin.next(value);
  }

  constructor(private Token: TokenService ) {}
}
