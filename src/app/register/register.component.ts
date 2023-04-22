import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { Account } from '../model/account';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = this._formBuilder.group({
    username: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.pattern("")]]
  });

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private accountService: AccountService, private authService: AuthService) {
    accountService.getAllAccounts()
      .subscribe(accounts => {
        const usernameList: string[] = accounts.map(account => account.username);

        //REGEX MAGIC
        let usernameListPattern: string = "^(?!";
        usernameList.forEach(username => usernameListPattern = usernameListPattern.concat(".*\\b", username, "\\b|"));
        usernameListPattern = usernameListPattern.replace(/\|$/, ").*$"); //Replace '|' at the end of the string with ").*$"
        const usernameListRegExp: RegExp = new RegExp(usernameListPattern, "i");


        this.registrationForm.controls["username"].setValidators([Validators.required, Validators.pattern(usernameListRegExp)]);
        this.registrationForm.controls["username"].updateValueAndValidity();
      });
  }

  ngOnInit(): void {
  }

  updatePasswordPattern(): void {
    let password = this.registrationForm.controls["password"].value || "";
    password = password.replace(/([-\[\]{}()*+?.,\\\/^$|#])/g, "\\$&"); //MORE REGEX MAGIC - adds a backslash before every regex special character
    this.registrationForm.controls["confirmPassword"].setValidators([Validators.required, Validators.pattern("^".concat(password, "$"))]);
    this.registrationForm.controls["confirmPassword"].updateValueAndValidity();
  }

  register(): void {
    if (this.registrationForm.valid) {
      const newAccount: Account = new Account();
      newAccount.username = this.registrationForm.controls["username"].value || "";
      newAccount.password = this.registrationForm.controls["password"].value || "";
      newAccount.type = "customer";
      this.accountService.addAccount(newAccount)
        .subscribe(account => {
          if (account) {
            this.authService.setLoggedAccount(account);
            this._snackBar.open("Registration Successful", "", {
              duration: 1500
            });
            this.router.navigate(["/"]);
            return;
          } else {
            this._snackBar.open("Registration Failed", "", { duration: 1500 });
          }
        });
    }
  }
}
