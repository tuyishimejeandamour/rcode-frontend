import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private Token: TokenService ) {}
  private loggedin = new BehaviorSubject<boolean>(this.Token.loggedin());
  
  authStatus= this.loggedin.asObservable();

  changeAuthStatus(value:boolean):void{
    this.loggedin.next(value);
  }


}
