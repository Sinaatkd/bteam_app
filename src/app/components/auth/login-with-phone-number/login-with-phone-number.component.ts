import { UserService } from './../../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../../../services/auth/login.service';
import { Component, OnInit } from '@angular/core';
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

  
  untilExpirationVerificationCode = '';
  loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      phoneNumber: new FormControl(null, { validators: [Validators.required, Validators.pattern('^[0-9]+$')] }),
      verificationCode: new FormControl(null, { validators: [Validators.required, Validators.pattern('^[0-9]+$')] }),
    });
  }

  sendVerification() {
    this.setTime();
    const phoneNumber = this.loginForm.controls.phoneNumber.value;
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

  moveToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

  onLoginUser() {
    this.setLoading('لطفا صبر کنید', 'ios');
    const phoneNumber = this.loginForm.controls.phoneNumber.value;
    const verificationCode = this.loginForm.controls.verificationCode.value;
    Device.getId().then(uuid => {
      const device_uuid = uuid.uuid;

      this.loginService.loginWithVerification(new VerificationLoginDTO(phoneNumber, verificationCode, device_uuid)).subscribe(res => {
        Storage.set({ key: 'token', value: res.token }).then();
        this.userService.getUserInfo().subscribe(user => {
          this.userService.setUser(user);
          this.setToast('خوش آمدید.', 'ios', 2000, 'success');
          this.navCtrl.navigateForward('tabs/home');
        });

        this.dismisLoading()
      }, err => {
        this.dismisLoading();
        if (err.error.non_field_errors && err.error.non_field_errors[0] === 'This UUID does not match the user UUID.') {
          this.setToast('تنها با دستگاهی می‌توانید وارد حساب کاربری خود شوید که با آن حساب را ایجاد کرده باشید', 'ios', 2000, 'danger');
        } else if (err.error.phone_number && err.error.phone_number[0] === 'This phone number has not yet been verified.') {
          this.setToast('شماره تلفن وارد شده تایید نشده است لطفا از طریق تلفن همراه وارد حساب خود شوید', 'ios', 2000, 'danger');
        } else if (err.error.phone_number && err.error.phone_number[0] === "This phone number dose not exists.") {
          this.setToast('شماره تلفن وارد شده اشتباه است', 'ios', 2000, 'danger');
        } else if (err.error.device_uuid && err.error.device_uuid[0] === 'This UUID dose not exists.') {
          this.setToast('دستگاه شما مورد تایید نمی‌باشد', 'ios', 2000, 'danger');
        } else if (err.error.non_field_errors && err.error.non_field_errors[0] === 'This code is invalid.') {
          this.setToast('کد ارسال شده درست نیست', 'ios', 2000, 'danger');
        } else if (err.error.non_field_errors && err.error.non_field_errors[0] === 'This code is expired.') {
          this.setToast('کد ارسال شده منقضی شده است', 'ios', 2000, 'danger');
        }
      });
    });
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
