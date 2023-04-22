import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products = new MatTableDataSource<Product>();
  formGroups: FormGroup<any>[] = [];

  displayedColumns: string[] = ['id', 'product', 'price', 'image', 'actions'];


  newProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    image: ['', Validators.required]
  })


  constructor(private productService: ProductService, private formBuilder: FormBuilder) {
    this.productService.getAllProducts()
      .subscribe(products => {
        this.products.data = products;
        this.formGroups = this.products.data.map(product => this.generateFormGroup(product));
      });
  }

  ngOnInit(): void {
  }

  generateFormGroup(product: Product): FormGroup<any> {
    return this.formBuilder.group({
        //prodId: [product.prodId, Validators.required],
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        image: [product.image, Validators.required]
      });
  }

  updateProduct(product: Product, index: number) {
    if (!this.formGroups[index].valid) { return; }

    product.name = this.formGroups[index].controls["name"].value;
    product.price = this.formGroups[index].controls["price"].value;
    product.image = this.formGroups[index].controls["image"].value;
    this.productService.updateProduct(product)
      .subscribe(dbProduct => {
        this.products.data[index] = dbProduct;
        this.formGroups[index] = this.generateFormGroup(this.products.data[index]);
      });
  }

  resetProduct(product: Product, index: number) {
    this.productService.getProduct(product.prodId)
      .subscribe(dbProduct => {
        this.products.data[index] = dbProduct;
        this.formGroups[index] = this.generateFormGroup(this.products.data[index]);
      });
  }

  deleteProduct(product: Product, index: number) {
    if (!this.formGroups[index].valid) { return; }
    
    this.productService.deleteProduct(product.prodId).subscribe();
    this.products.data = this.products.data.filter(p => p.prodId !== product.prodId);
    this.formGroups.splice(index, 1);
  }

  addProduct() {
    if (!this.newProductForm.valid) { return; }

    const product: Product = new Product();
    product.name = this.newProductForm.controls["name"].value || "";
    product.price = Number(this.newProductForm.controls["price"].value);
    product.image = this.newProductForm.controls["image"].value || "";

    this.productService.addProduct(product)
      .subscribe(dbProduct => {
        this.products.data.push(dbProduct);
        this.products.data = [...this.products.data];
        this.formGroups.push(this.generateFormGroup(dbProduct));
      })
  }

}
