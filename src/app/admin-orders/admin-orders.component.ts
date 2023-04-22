import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { OrderService } from '../service/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders = new MatTableDataSource<Order>();
  formGroups: FormGroup<any>[] = [];

  displayedColumns: string[] = ['orderId', 'acctId', 'fullName', 'address', 'products', 'totalPrice', 'paymentMethod', 'status', 'actions'];

  constructor(private orderService: OrderService, private formBuilder: FormBuilder) {
    this.orderService.getAllOrders()
      .subscribe(orders => {
        this.orders.data = orders;
        this.formGroups = this.orders.data.map(order => this.generateFormGroup(order));
      });
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



  jsonToFormattedString(cartJSON: string): string {
    const cart: [Product, number][] = JSON.parse(cartJSON);
    return cart.reduce((acc, item) => acc.concat(item[1].toString(), "x ", item[0].name, ", "), "").replace(/(,\ )$/, "");
  }
}
