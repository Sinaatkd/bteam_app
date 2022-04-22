import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginWithPhoneNumberColor: 'light' | 'primary' = 'primary';
  loginWithPasswordColor: 'light' | 'primary' = 'light';
  loginMode: 'password'| 'phoneNumber' = 'phoneNumber';
  
  constructor() { }

  ngOnInit() {
  }

  onChangeColor(target: 'phoneNumber' | 'password') {
    if (target === 'password') {
      this.loginMode = 'password';
      this.loginWithPhoneNumberColor = 'light';
      this.loginWithPasswordColor = 'primary';
    } else {
      this.loginMode = 'phoneNumber';
      this.loginWithPhoneNumberColor = 'primary';
      this.loginWithPasswordColor = 'light';
    }
  }
}
