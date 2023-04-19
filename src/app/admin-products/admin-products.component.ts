import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: Product[] = [];
  dataSource = new MatTableDataSource<Product>();

  displayedColumns: string[] = ['id', 'product', 'price', 'image'];

  constructor(private productService: ProductService) {
    this.productService.getAllProducts()
      .subscribe(products => {
        this.products = products;
        this.dataSource.data = this.products;
      });
  }

  ngOnInit(): void {
  }

}
