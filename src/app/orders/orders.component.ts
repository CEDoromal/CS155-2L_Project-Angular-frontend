import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { OrderService } from '../service/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product';
import { AuthService } from '../auth.service';
import { Account } from '../model/account';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  account: Account | null = null;
  orders = new MatTableDataSource<Order>();
  formGroups: FormGroup<any>[] = [];

  displayedColumns: string[] = ['orderId', 'fullName', 'address', 'products', 'totalPrice', 'paymentMethod', 'status', 'actions'];

  constructor(private orderService: OrderService, private authService: AuthService,private formBuilder: FormBuilder) {
    this.authService.loggedAccount$.subscribe(account => this.account = account);
    (this.account)?
    this.orderService.getAllOrdersByAccountId(this.account.acctId)
      .subscribe(orders => {
        this.orders.data = orders;
        this.formGroups = this.orders.data.map(order => this.generateFormGroup(order));
      }) : console.log("NO LOGGED ACCOUNT");
  }

  ngOnInit(): void {
  }

  generateFormGroup(order: Order): FormGroup<any> {
    return this.formBuilder.group({
      //fullName: [order.fullName, Validators.required],
      //products: [order.products, Validators.required],
      //address: [order.address, Validators.required],
      //totalPrice: [order.totalPrice, Validators.required],
      status: [order.status, Validators.required]
    });
  }

  /*
  updateOrder(order: Order, index: number) {
    if (!this.formGroups[index].valid) { return; }

    order.status = this.formGroups[index].controls["status"].value;
    this.orderService.updateOrder(order)
      .subscribe(dbOrder => {
        this.orders.data[index] = dbOrder;
        this.formGroups[index] = this.generateFormGroup(this.orders.data[index]);
      });
  }

  resetOrder(order: Order, index: number) {
    this.orderService.getOrder(order.orderId)
      .subscribe(dbOrder => {
        this.orders.data[index] = dbOrder;
        this.formGroups[index] = this.generateFormGroup(this.orders.data[index]);
      });
  }

  deleteOrder(order: Order, index: number) {
    if (!this.formGroups[index].valid) { return; }

    this.orderService.deleteOrder(order.orderId).subscribe();
    this.orders.data = this.orders.data.filter(p => p.orderId !== order.orderId);
    this.formGroups.splice(index, 1);
  }
  */

  cancelOrder(order: Order, index: number) {
    if (!this.formGroups[index].valid) { return; }

    order.status = "Cancelled";
    this.orderService.updateOrder(order)
      .subscribe(dbOrder => {
        this.orders.data[index] = dbOrder;
        this.orders.data = [... this.orders.data];
        this.formGroups[index] = this.generateFormGroup(this.orders.data[index]);
      });
  }


  jsonToFormattedString(cartJSON: string): string {
    const cart: [Product, number][] = JSON.parse(cartJSON);
    return cart.reduce((acc, item) => acc.concat(item[1].toString(), "x ", item[0].name, ", "), "").replace(/(,\ )$/, "");
  }
}
