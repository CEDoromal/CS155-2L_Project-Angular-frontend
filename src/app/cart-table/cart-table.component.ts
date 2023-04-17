import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../cart.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit {

  @Input("cart") cart: [Product, number][] = [];
  
  displayedColumns: string[] = ['product', 'quantity', 'price'];

  constructor() {
  }

  ngOnInit(): void {
  }

  getTotalCost(): number {
    return this.cart.map(item => item[0].price*item[1]).reduce((acc, value) => acc + value, 0)
  }

}
