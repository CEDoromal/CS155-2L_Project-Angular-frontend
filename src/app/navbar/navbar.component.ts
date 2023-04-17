import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { Account } from '../model/account';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedAccount: Account|null = null;
  badgeContent: number = 0;

  constructor(private cartService: CartService, private authService: AuthService) {
    this.cartService.cart$
      .subscribe(cart => {
        this.badgeContent = cart.map(item => item[1])
        .reduce((acc, value) => acc + value, 0);
      });
    this.authService.loggedAccount$
      .subscribe(loggedAccount => this.loggedAccount = loggedAccount);
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.cartService.updateCart([]);
    this.authService.setLoggedAccount(null);
  }

}
