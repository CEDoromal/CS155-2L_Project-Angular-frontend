import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { AuthService } from '../auth.service';
import { Account } from '../model/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  private cart: [Product, number][];
  private account: Account | null = null;

  constructor(private productService: ProductService, private cartService: CartService, private authService: AuthService, private router: Router) {
    this.products = [];
    this.productService.getAllProducts()
      .subscribe(products => this.products = products);
    this.cart = [];
    this.cartService.cart$
      .subscribe(cart => this.cart = cart);
    this.authService.loggedAccount$
      .subscribe(account => this.account = account);
  }

  ngOnInit(): void {
  }

  public addToCart(product: Product) {
    if(!this.account) {
      this.router.navigate(["/login"]);
      return;
    }

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
