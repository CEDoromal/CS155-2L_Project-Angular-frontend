import { Observable } from "rxjs";
import { Transaction } from "../model/transaction";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>("/api/transactions/add", transaction, this.httpOptions);
  }

  public updateTransaction(transaction: Transaction): Observable<any> {
    return this.http.put("/api/transactions/update", transaction, this.httpOptions);
  }

  public deleteTransaction(id: number): void {
    const url = `/api/transactions/delete/${id}`;
    this.http.delete(url);
  }

  public getTransaction(id: number): Observable<Transaction> {
    const url = `/api/transactions/${id}`;
    return this.http.get<Transaction>(url);
  }

  public getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>("/api/transactions");
  }
}
