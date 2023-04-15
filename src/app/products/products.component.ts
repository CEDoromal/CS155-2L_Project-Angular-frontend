import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  private cart: [Product, number][];

  constructor(private productService: ProductService, private cartService: CartService) {
    this.products = [];
    this.productService.getAllProducts()
    .subscribe(products => this.products = products);
    this.cart = [];
    this.cartService.cart$
      .subscribe(cart => this.cart = cart);
  }

  ngOnInit(): void {
  }

  public addToCart(product: Product) {
    var index: number = -1;
    //Try and find if product is already in the cart
    for (let i = 0; i < this.cart.length; i++){
      if (this.cart[i][0].prod_id === product.prod_id) {
        index = i; //Store the index where the product is located
        break;
      }
    }
    if (index < 0) { 
      this.cart.push([product, 1]); //Append to cart if product is not found
    } else {
      this.cart[index][1]++; //Increase quantity when product is found
    }
    this.cartService.updateCart(this.cart);
  }

  public removeFromCart(index: number) {

  }

}
