import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../../../../services/user.service';
import { UserModel } from './../../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit {

  user: UserModel['user'];
  userForm: FormGroup

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user.user;
      this.userForm = new FormGroup({
        fullName: new FormControl(this.user.full_name),
        phoneNumber: new FormControl(this.user.phone_number),
        fromCity: new FormControl(this.user.from_city),
        nationalCode: new FormControl(this.user.national_code),
        familiarityWithDigitalCurrencies: new FormControl(this.user.familiarity_with_digital_currencies),
        getToKnowUs: new FormControl(this.user.get_to_know_us),
        amountOfCapital: new FormControl(this.user.amount_of_capital),
        isReceiveNewsNotifications: new FormControl(this.user.is_receive_news_notifications),
        isReceiveSignalNotifications: new FormControl(this.user.is_receive_signal_notifications),
      });
    });
  }

  saveInfo() {
    this.alertCtrl.create({
      mode: 'ios',
      header: 'آیا اطلاعات تغییر داده شده ذخیره شوند؟',
      buttons: [
        {
          text: 'بله',
          handler: () => { this.editUser() },
        },
        {
          text: 'خیر',
        }
      ]
    }).then(alertEl => alertEl.present());
  }

  editUser() {
    const fullName = this.userForm.controls.fullName.value;
    const phoneNumber = this.userForm.controls.phoneNumber.value;
    const fromCity = this.userForm.controls.fromCity.value;
    const nationalCode = this.userForm.controls.nationalCode.value;
    const familiarityWithDigitalCurrencies = this.userForm.controls.familiarityWithDigitalCurrencies.value;
    const getToKnowUs = this.userForm.controls.getToKnowUs.value;
    const amountOfCapital = this.userForm.controls.amountOfCapital.value;
    const isReceiveNewsNotifications = this.userForm.controls.isReceiveNewsNotifications.value;
    const isReceiveSignalNotifications = this.userForm.controls.isReceiveSignalNotifications.value;

    const newUser = new UserModel(
      {
        id: this.user.id,
        password: '',
        username: '',
        is_active: true,
        is_phone_number_verifyed: true,
        full_name: fullName,
        phone_number: phoneNumber,
        national_code: nationalCode,
        from_city: fromCity,
        amount_of_capital: amountOfCapital,
        familiarity_with_digital_currencies: familiarityWithDigitalCurrencies,
        get_to_know_us: getToKnowUs,
        is_receive_signal_notifications: isReceiveSignalNotifications,
        is_receive_news_notifications: isReceiveNewsNotifications,
      },
      null
    )

    this.userService.editUserInfo(newUser).subscribe(res => {
      this.userService.getUser().subscribe(user => {
        const u = user;
        u.user = res;
        this.userService.setUser(u)
        this.navCtrl.navigateBack('tabs/account');
      })
    });
  }
}
