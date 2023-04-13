import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }


  private cart: BehaviorSubject<[Product, number][]> = new BehaviorSubject<[Product, number][]>([]);
  public cart$: Observable<[Product, number][]> = this.cart.asObservable();

  public updateCart(updatedCart: [Product, number][]) {
    this.cart.next(updatedCart);
  }
}
