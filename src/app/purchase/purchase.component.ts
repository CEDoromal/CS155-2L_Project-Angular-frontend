import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  //Terrible workaround
  cartCopy: [Product, number][] = []; //using cartCopy because cart gets cleared upon clicking

  cart: [Product, number][] = [];
  isEditable: boolean = true;
  fullName: string = '';
  address: string = '';
  paymentMethod: string = '';

  orderDetails = this._formBuilder.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    paymentMethod: ['', Validators.required]
  });

  constructor(private _formBuilder: FormBuilder, private cartService: CartService) {
    this.cartService.cart$
      .subscribe(cart => this.cart = cart);
  }


  ngOnInit(): void {
    this.isEditable = true;
  }

  placeOrder(): void {
    if (this.orderDetails.valid) {
      this.isEditable = false;
      this.cartCopy = this.cart;
      this.cartService.updateCart([]);
    }
  }

}
