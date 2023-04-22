import { Observable, of } from "rxjs";
import { Order } from "../model/order";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>("/api/orders/add", order, this.httpOptions);
  }

  public updateOrder(order: Order): Observable<any> {
    return this.http.put("/api/orders/update", order, this.httpOptions);
  }

  public deleteOrder(id: number): Observable<Order> {
    const url = `/api/orders/delete/${id}`;
    return this.http.delete<Order>(url, this.httpOptions);
  }

  public getOrder(id: number): Observable<Order> {
    const url = `/api/orders/${id}`;
    return this.http.get<Order>(url);
  }

  public getAllOrders(): Observable<Order[]> {
    //return of(JSON.parse('[{"orderId":5,"acctId":4,"fullName":"4f n 32","products":"4this this and that 32","address":"4bahay32 k2ubo","totalPrice":41233,"paymentMethod":"4isa32","status":"4Pending Payment23"},{"orderId":6,"acctId":4,"fullName":"4f n 32","products":"4this this and that 32","address":"4bahay32 k2ubo","totalPrice":41233,"paymentMethod":"4isa32","status":"4Pending Payment23"}]'));
    return this.http.get<Order[]>("/api/orders");
  }
}
