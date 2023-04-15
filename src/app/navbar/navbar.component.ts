import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  badgeContent: number;

  constructor(private cartService: CartService) {
    this.badgeContent = 0;
    this.cartService.cart$
      .subscribe(cart => {
        this.badgeContent = 0;
        cart.forEach(item => {
          this.badgeContent += item[1];
        });
      });
  }

  ngOnInit(): void {
  }

  
}
