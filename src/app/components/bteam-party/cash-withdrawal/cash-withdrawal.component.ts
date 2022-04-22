import { BteamPartyService } from 'src/app/services/bteam-party.service';
import { ToastController, NavController } from '@ionic/angular';
import { UserService } from './../../../services/user.service';
import { UserModel } from './../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-withdrawal',
  templateUrl: './cash-withdrawal.component.html',
  styleUrls: ['./cash-withdrawal.component.scss'],
})
export class CashWithdrawalComponent implements OnInit {

  @Input('cardCode') cardCode: string;
  @Input('walletAmount') walletAmount: number;
  userCardBankNumber: number = 0;
  amount = 0;
  user: UserModel;


  constructor(
    private userService: UserService,
    private toastCtrl: ToastController,
    private bteamPartyService: BteamPartyService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    })
  }

  enterBankCodeInputChanged(event) {
    this.userCardBankNumber = event.detail.value;
  }
  setAmount(event?) {
    if (event) {
      this.amount = event.detail.value;
    } else {

      this.amount = this.walletAmount;
    }
  }

  onCashWithdrawalClick() {
    if (this.userCardBankNumber.toString().length < 16 || this.userCardBankNumber.toString().length > 16) {
      this.toastCtrl.create({ message: 'شماره کارت نامعتبر است', mode: 'ios', duration: 1500, color: 'danger' }).then(toastEl => toastEl.present());
      return;
    }
    if (this.walletAmount < 10000) {
      this.toastCtrl.create({ message: 'حداقل موجودی شما برای برداشت وجه باید 10,000 هزار تومن باشد', mode: 'ios', duration: 1500, color: 'danger' }).then(toastEl => toastEl.present());
      return;
    }
    if (this.amount < 10000) {
      this.toastCtrl.create({ message: 'حداقال رقم وارد شده باید 10,000 هزار تومن باشد', mode: 'ios', duration: 1500, color: 'danger' }).then(toastEl => toastEl.present());
      return;
    }
    if (this.walletAmount < this.amount) {
      this.toastCtrl.create({ message: 'موجودی کیف پول شما کمتر از رقم وارد شده است', mode: 'ios', duration: 1500, color: 'danger' }).then(toastEl => toastEl.present());
      return;
    }

    this.bteamPartyService.cashWithdrawal(this.userCardBankNumber, this.amount, this.user.user.id).subscribe(res => {
      this.toastCtrl.create({mode: 'ios', message: 'درخواست شما با موفقیت ثبت شد.', duration:1500, color: 'success'}).then(toastEl => {
        toastEl.present();
        this.navCtrl.navigateBack('/tabs/account');
      });
    });
  }
}
