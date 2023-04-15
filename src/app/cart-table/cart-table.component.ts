import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../cart.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit {

  cart: [Product, number][] = [];
  dataSource = new MatTableDataSource<[Product, number]>();
  
  displayedColumns: string[] = ['product', 'quantity', 'price'];

  constructor(private cartService: CartService) {
    this.cartService.cart$
      .subscribe(cart => {
        this.cart = cart;
        this.dataSource.data = this.cart;
      });
  }

  ngOnInit(): void {
  }

  getTotalCost(): number {
    return this.cart.map(item => item[0].price*item[1]).reduce((acc, value) => acc + value, 0)
  }

  setCartItemQuantity(index: number, event: Event) {
    const value: number = Number((event.target as HTMLInputElement).value);
    if (value > 0) {
      this.cart[index][1] = value;
      this.cartService.updateCart(this.cart);
    } else {
      this.removeCartItem(index);
    }
  }

  removeCartItem(index: number) {
    this.cart.splice(index, 1);
    this.cartService.updateCart(this.cart);
  }

}
