import { Observable } from "rxjs";
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

  public deleteProduct(id: number): void {
    const url = `/api/products/delete/${id}`;
    this.http.delete(url);
  }

  public getProduct(id: number): Observable<Product> {
    const url = `/api/products/${id}`;
    return this.http.get<Product>(url);
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("/api/products");
  }
}
