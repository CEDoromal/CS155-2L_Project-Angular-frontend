import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';
import { Product } from '../model/product';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order';
import { AccountService } from '../service/account.service';
import { AuthService } from '../auth.service';
import { Account } from '../model/account';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  account: Account | null = null;

  orderDetails = this._formBuilder.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    paymentMethod: ['', Validators.required]
  });

  constructor(private _snackBar: MatSnackBar, private _formBuilder: FormBuilder, private cartService: CartService, private orderService: OrderService, private authService: AuthService) {
    this.cartService.cart$
      .subscribe(cart => this.cart = cart);
    this.authService.loggedAccount$
      .subscribe(loggedAccount => this.account = loggedAccount);
  }


  ngOnInit(): void {
    this.isEditable = true;
  }

  placeOrder(): void {
    if (this.orderDetails.valid) {
      this.isEditable = false;
      this.cartCopy = this.cart;
      this.cartService.updateCart([]);


      const order: Order = new Order();;
      (this.account)? order.acctId = this.account.acctId: console.log("NO LOGGED ACCOUNT");
      order.fullName = this.orderDetails.controls['fullName'].value || "";
      order.address = this.orderDetails.controls['address'].value || "";
      order.products = JSON.stringify(this.cartCopy);
      order.totalPrice = this.cartCopy.map(item => item[0].price*item[1]).reduce((acc, value) => acc + value, 0)
      order.paymentMethod = this.orderDetails.controls['paymentMethod'].value || "";
      order.status = "Payment Pending";

      this.orderService.addOrder(order).subscribe(() => this._snackBar.open("Order Successfully Placed", "", {duration: 1500}));
    }
  }

}
