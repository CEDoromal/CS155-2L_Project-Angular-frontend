import { Observable } from "rxjs";
import { Account } from "../model/account";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>("/api/accounts/add", account, this.httpOptions);
  }

  public updateAccount(account: Account): Observable<any> {
    return this.http.put("/api/accounts/update", account, this.httpOptions);
  }

  public deleteAccount(id: number): void {
    const url = `/api/accounts/delete/${id}`;
    this.http.delete(url);
  }

  public login(user: string, pass: string): Observable<Account> {
    const credentials = {
      username: user,
      password: pass
    };
    return this.http.post<Account>("/api/accounts/login", credentials, this.httpOptions);
  }

  public getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>("/api/accounts", this.httpOptions);
  }
}
