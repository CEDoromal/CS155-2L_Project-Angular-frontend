import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private accountService: AccountService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.controls["username"].value || "", this.loginForm.controls["password"].value || "")
        .subscribe(account => {
          if (account) {
            this.authService.setLoggedAccount(account);
            this._snackBar.open("Login Successful", "", {
              duration: 1500
            });
            this.router.navigate(["/"]);
          } else {
            this._snackBar.open("Login Failed", "", { duration: 1500 })
          }
        });
    }
  }
}
