import { UserService } from './../../../services/user.service';
import { LoginService } from './../../../services/auth/login.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { LoginDTO } from 'src/app/DTOs/auth/login.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@capacitor/storage';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-login-with-password',
  templateUrl: './login-with-password.component.html',
  styleUrls: ['./login-with-password.component.scss'],
})
export class LoginWithPasswordComponent implements OnInit {

  loginForm: FormGroup;
  @Output('loginModeEmitter') loginModeEmitter = new EventEmitter()

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      phoneNumber: new FormControl(null, { validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')], updateOn: 'change' }),
      password: new FormControl(null, { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9 \-\\_\']+')], updateOn: 'change' }),
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
    Device.getId().then(uuid => {
      const phoneNumber = this.loginForm.controls.phoneNumber.value;
      const password = this.loginForm.controls.password.value;
      this.loginService.loginWithPhonePassword(new LoginDTO(phoneNumber, password, uuid.uuid)).subscribe(res => {
        Storage.set({ key: 'token', value: res.token }).then();
        this.userService.getUserInfo().subscribe(user => {
          this.userService.setUser(user);
          this.setToast('خوش آمدید', 'ios', 2000, 'success');
          this.dismisLoading();
          this.navCtrl.navigateForward('tabs/home');
        })
      }, err => {
        if (err.error.phone_number && err.error.phone_number[0] === 'This phone number has not yet been verified.') {
          this.setToast('شماره تلفن وارد شده تایید نشده است لطفا از طریق تلفن همراه وارد حساب خود شوید', 'ios', 2000, 'danger');
        } else if (err.error.phone_number && err.error.phone_number[0] === "This phone number dose not exists.") {
          this.setToast('شماره تلفن وارد شده اشتباه است', 'ios', 2000, 'danger');
        } else if (err.error.device_uuid && err.error.device_uuid[0] === 'This UUID dose not exists.') {
          this.setToast('دستگاه شما مورد تایید نمی‌باشد', 'ios', 2000, 'danger');
        } else if (err.error.non_field_errors && err.error.non_field_errors[0] === 'Password is incorrect.') {
          this.setToast('رمز وارد شده صحیح نیست', 'ios', 2000, 'danger');
        } else if (err.error.non_field_errors && err.error.non_field_errors[0] === 'This UUID does not match the user UUID.') {
          this.setToast('تنها با دستگاهی می‌توانید وارد حساب کاربری خود شوید که با آن حساب را ایجاد کرده باشید', 'ios', 2000, 'danger');
        }
        this.dismisLoading();
      });
    });
  }

  moveToForgotPassPage() {
    this.navCtrl.navigateForward('/forgot-pass');
  }

  setLoginWithPhoneNumberMode() {
    this.loginModeEmitter.emit('phoneNumber');
  }
}
