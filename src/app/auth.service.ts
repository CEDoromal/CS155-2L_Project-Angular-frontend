import { Injectable } from '@angular/core';
import { Account } from './model/account';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private loggedAccount: BehaviorSubject<Account|null> = new BehaviorSubject<Account|null>(JSON.parse(sessionStorage.getItem("loggedAccount") || "null"));
  public loggedAccount$: Observable<Account|null> = this.loggedAccount.asObservable();

  public setLoggedAccount(loggedAccount: Account|null) {
    this.loggedAccount.next(loggedAccount);
    sessionStorage.setItem("loggedAccount", JSON.stringify(loggedAccount));
  }
}
