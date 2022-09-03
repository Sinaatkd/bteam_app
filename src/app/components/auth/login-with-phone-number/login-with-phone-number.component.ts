import { UserService } from './../../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../../../services/auth/login.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { VerificationLoginDTO } from 'src/app/DTOs/auth/login.dto';
import { Storage } from '@capacitor/storage';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-login-with-phone-number',
  templateUrl: './login-with-phone-number.component.html',
  styleUrls: ['./login-with-phone-number.component.scss'],
})
export class LoginWithPhoneNumberComponent implements OnInit {

  @Output() loginModeEmitter = new EventEmitter<string>()
  untilExpirationVerificationCode = '';
  loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      phoneNumber: new FormControl(null, { validators: [Validators.required, Validators.pattern('^[0-9]+$')] }),
    });
  }

  sendVerification() {
    this.setTime();
    this.setLoading('لطفا منتظر بمانید', 'ios');
    const phoneNumber = this.loginForm.controls.phoneNumber.value;
    Storage.set({key: 'phoneNumber', value: phoneNumber}).then();
    this.loginService.sendVerificationCode(phoneNumber).subscribe(res => {
      this.setToast('کد ارسال شد.', 'ios', 2000, 'success');
      this.loginModeEmitter.emit('verifyPhoneNumber');
      this.dismissLoading();
    }, err => {
      this.setToast('شماره تلفن وارد شده اشتباه است', 'ios', 2000, 'danger');
      this.dismissLoading();
    });
  }

  setLoading(message: string, mode: 'ios' | 'md') {
    this.loadingCtrl.create({ message, mode }).then(loadingEl => loadingEl.present());
  }

  dismissLoading() {
    setTimeout(() => {
      this.loadingCtrl.dismiss().then();
    }, 200);
  }

  setToast(message: string, mode: 'ios' | 'md', duration: number, color: 'success' | 'warning' | 'danger') {
    this.toastCtrl.create(
      { message, mode, duration, color }
    ).then(toastEl => toastEl.present());
  }

  moveToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

  setTime() {
    var sec = 59;
    var timer = setInterval(() => {
      this.untilExpirationVerificationCode = '00:' + sec;
      sec--;
      if (sec < 0) {
        clearInterval(timer);
        this.untilExpirationVerificationCode = '';
      }
    }, 1000);
  }

  setLoginWithPasswordMode() {
    this.loginModeEmitter.emit('password')
  }
}
