import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}


  ngOnInit(): void {
  }

}
