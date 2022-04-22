import { Device } from '@capacitor/device';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './../../../services/auth/login.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage implements OnInit {

  untilExpirationVerificationCode = '';
  changePasswordForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      phoneNumber: new FormControl(null, { validators: [Validators.required] }),
      newPass: new FormControl(null, { validators: [Validators.required] }),
      verificationCode: new FormControl(null, { validators: [Validators.required, Validators.pattern('^[0-9]+$')] }),
    });
  }

  sendVerification() {
    this.setTime();
    const phoneNumber = this.changePasswordForm.controls.phoneNumber.value;
    this.loginService.sendVerificationCode(phoneNumber).subscribe(res => {
      this.setToast('کد ارسال شد.', 'ios', 2000, 'success');
    });
  }

  setLoading(message: string, mode: 'ios' | 'md') {
    this.loadingCtrl.create({ message, mode }).then(loadingEl => loadingEl.present());
  }

  dismisLoading() {
    setTimeout(() => {
      this.loadingCtrl.dismiss().then();
    }, 200);
  }

  setToast(message: string, mode: 'ios' | 'md', duration: number, color: 'success' | 'warning' | 'danger') {
    this.toastCtrl.create(
      { message, mode, duration, color }
    ).then(toastEl => toastEl.present());
  }


  onChnageUserPass() {
    this.setLoading('لطفا صبر کنید', 'ios');
    const phoneNumber = this.changePasswordForm.controls.phoneNumber.value;
    const verificationCode = this.changePasswordForm.controls.verificationCode.value;
    const newPass = this.changePasswordForm.controls.newPass.value;
    this.loginService.forgotPass(phoneNumber, verificationCode, newPass).subscribe(res => {
      this.setToast('رمز تغییر کرد.', 'ios', 2000, 'success');
      this.navCtrl.navigateBack('/login');
      this.dismisLoading()
    }, err => {
      this.setToast('کد منقضی شده است.', 'ios', 2000, 'success');
      this.dismisLoading()
    })
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


}
