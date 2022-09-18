import { UserService } from 'src/app/services/user.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { IonInput } from '@ionic/angular';

import { LoginService } from './../../../services/auth/login.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { VerificationLoginDTO } from 'src/app/DTOs/auth/login.dto';
import { Storage } from '@capacitor/storage';
import { Device } from '@capacitor/device';


@Component({
  selector: 'app-verify-phone-number',
  templateUrl: './verify-phone-number.component.html',
  styleUrls: ['./verify-phone-number.component.scss'],
})
export class VerifyPhoneNumberComponent implements OnInit {
  @Output() loginModeEmitter = new EventEmitter<string>();

  @ViewChild('input4') input4: IonInput;
  @ViewChild('input3') input3: IonInput;
  @ViewChild('input2') input2: IonInput;
  @ViewChild('input1') input1: IonInput;

  code = '';
  phoneNumber;
  timer = 60

  constructor(

    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit() {
    Storage.get({ key: 'phoneNumber' }).then(({ value }) => {
      this.phoneNumber = value;
    })

    setInterval(() => {
      this.timer -= 1;
    }, 1000)
  }

  editPhoneNumber() {
    this.loginModeEmitter.emit('phoneNumber');
  }

  inputChange(event, inputNumber) {
    if (event.type === 'ionInput' && event.detail.inputType === 'insertText') {
      switch (inputNumber) {
        case 'input1':
          this.code = `${this.input1.value}`
          this.input2.setFocus();
          break;
        case 'input2':
          this.code = `${this.input1.value}${this.input2.value}`
          this.input3.setFocus();
          break;
        case 'input3':
          this.code = `${this.input1.value}${this.input2.value}${this.input3.value}`
          this.input4.setFocus();
          break;
        case 'input4':
          this.code = `${this.input1.value}${this.input2.value}${this.input3.value}${this.input4.value}`
          this.loginUser()
          break;
      }
    }
  }

  loginUser() {
    this.setLoading('لطفا صبر کنید', 'ios');
    const phoneNumber = parseInt(this.phoneNumber, 0);
    Device.getId().then(uuid => {
      const device_uuid = uuid.uuid;

      this.loginService.loginWithVerification(new VerificationLoginDTO(phoneNumber, parseInt(this.code, 0), device_uuid)).subscribe(res => {
        Storage.set({ key: 'token', value: res.token }).then();
        this.userService.getUserInfo().subscribe(user => {
          this.userService.setUser(user);
          this.setToast('خوش آمدید.', 'ios', 2000, 'success');
          Storage.remove({ key: 'phoneNumber' }).then();
          this.navCtrl.navigateBack('tabs/home');
        });

        this.dismissLoading()
      }, err => {
        this.dismissLoading();
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

  sendVerificationCodeAgain() {
    const phoneNumber = parseInt(this.phoneNumber, 0);
    this.loginService.sendVerificationCode(phoneNumber).subscribe(res => {
      this.setToast('کد تایید مجدد ارسال شد', 'ios', 2000, 'success');
      this.timer = 60;
    })
  }
}
