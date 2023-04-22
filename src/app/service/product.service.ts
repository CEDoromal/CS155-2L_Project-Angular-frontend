import { Observable, of, map } from "rxjs";
import { Product } from "../model/product";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>("/api/products/add", product, this.httpOptions);
  }

  public updateProduct(product: Product): Observable<any> {
    return this.http.put("/api/products/update", product, this.httpOptions);
  }

  public deleteProduct(id: number): Observable<Product> {
    const url = `/api/products/delete/${id}`;
    return this.http.delete<Product>(url, this.httpOptions);
  }

  public getProduct(id: number): Observable<Product> {
    const url = `/api/products/${id}`;
    return this.http.get<Product>(url);
  }

  public getAllProducts(): Observable<Product[]> {
    //return of('[{"prodId":3,"name":"Banana Cake (w/ Chocolate Chips)","price":170,"image":"breadchocolate.jpeg"},{"prodId":4,"name":"Banana Cake (w/ Almonds)","price":200,"image":"breadalmond.jpeg"},{"prodId":5,"name":"Banana Cake (w/ Cashews)","price":200,"image":"breadcashew.jpeg"},{"prodId":6,"name":"Banana Cake (w/ Walnuts)","price":200,"image":"breadwalnuts.jpeg"},{"prodId":7,"name":"Cocoa Dream Cake (Regular)","price":170,"image":"dreamcake2.jpeg"},{"prodId":8,"name":"Cocoa Dream Cake (Medium)","price":300,"image":"dreamcake2.jpeg"},{"prodId":9,"name":"Cocoa Dream Cake (Party)","price":600,"image":"dreamcake2.jpeg"},{"prodId":10,"name":"Chocolate Revel Bar","price":170,"image":"revelbar2.jpeg"}]').pipe(map(o => JSON.parse(o)));


    return this.http.get<Product[]>("/api/products");
  }
}
