import { UserModel } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpecialAccountModel } from './../../../models/specialAccount.model';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController, NavController } from '@ionic/angular';
import { SpecialAccountService } from 'src/app/services/special-account.service';
import { TransactionDTO } from 'src/app/DTOs/createTransaction.dto';

@Component({
  selector: 'app-buy-special-account',
  templateUrl: './buy-special-account.component.html',
  styleUrls: ['./buy-special-account.component.scss'],
})
export class BuySpecialAccountComponent implements OnInit {

  specialItem: SpecialAccountModel;
  discountCodeId = null;
  checkDiscountCodeLoading = false;
  user: UserModel['user'];
  userTransaction: UserModel['transaction'];
  segmentValue: 'sendReceipt' | 'info' = 'info';
  paymentMode: 'online' | 'offline' = 'online';
  paymentForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private userService: UserService,
    private alertCtrl: AlertController,
    private specialAcountService: SpecialAccountService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user.user;
      this.specialItem = this.navParams.get('specialItem');
      this.paymentForm = new FormGroup({
        fullName: new FormControl(this.user.full_name),
        phoneNumber: new FormControl(this.user.phone_number),
        salesCode: new FormControl(this.user.phone_number),
        isAccepInformation: new FormControl(false),
        specialItemName: new FormControl(this.specialItem.title),
        specialItemPrice: new FormControl(this.specialItem.price + ' تومان'),
        specialItemExpireDay: new FormControl(this.specialItem.expire_day + ' روز'),
        consultant: new FormControl(null, [Validators.required]),
        discountCode: new FormControl(null),
      });
    });

    
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
  }

  setToast(message: string, mode: 'ios' | 'md', duration: number, color: 'success' | 'warning' | 'danger') {
    this.toastCtrl.create(
      { message, mode, duration, color }
    ).then(toastEl => toastEl.present());
  }

  onPayment() {
    this.alertCtrl.create({
      mode: 'ios',
      header: 'توجه',
      message: `لطفا مبلغ ${this.specialItem.price} تومن را پرداخت کنید و عکس فیش واریزی را در قسمت "ارسال فیش" در بخش حساب کاربری آپلود کنید`,
      buttons: [{
        text: 'ورود به درگاه  پرداخت',
        handler: () => {
          this.createTransaciotn()
        }
      }]
    }).then(alertEl => alertEl.present());
  }

  paymentModeChanged(event: any) {
    this.paymentMode = event.detail.value;
  }

  onApplyDiscountCode() {
    this.checkDiscountCodeLoading = true;
    const code = this.paymentForm.controls.discountCode.value;
    this.specialAcountService.checkDiscountCode(code, this.specialItem.price).subscribe(res => {
      this.discountCodeId = res.discount_code_id
      this.specialItem.price = res.new_amount;
      this.paymentForm.controls.specialItemPrice.setValue(res.new_amount);
      this.paymentForm.controls.discountCode.setValue(null);
      this.checkDiscountCodeLoading = false;
      this.setToast('اعمال شد', 'ios', 2000, 'success');

    }, err => {
      this.paymentForm.controls.discountCode.setValue(null);
      this.checkDiscountCodeLoading = false;
      if (err.error.code[0] === 'This code dose not exists.') {
        this.setToast('کد معتبر نیست', 'ios', 2000, 'warning');
      } else if (err.error.code[0] === 'You already use this code.') {
        this.setToast('شما قبلا از این کد استفاده کرده اید', 'ios', 2000, 'warning');
      } else if (err.error.code[0] === 'This code number has expired.') {
        this.setToast('تعداد کد به اتمام رسیده است', 'ios', 2000, 'warning');
      }

    });
  }

  onCreateTransaction() {
    if (!this.userTransaction || this.userTransaction) {
      
    }
    this.alertCtrl.create({
      mode: 'ios',
      header: 'توجه',
      message: `لطفا مبلغ ${this.specialItem.price} تومن را به شماره کارت وارد شده واریز کنید و عکس فیش واریزی را در قسمت "ارسال فیش" در بخش حساب کاربری آپلود کنید`,
      buttons: [
        {
          text: 'باشه',
          handler: () => {
            this.createTransaciotn();
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

  createTransaciotn() {
    let transaction = new TransactionDTO(
      1,
      this.paymentMode,
      this.specialItem.price,
      this.specialItem.expire_day,
      'در انتظار ارسال فیش',
      this.paymentForm.controls.consultant.value,
      this.user.id,
      this.discountCodeId,
      this.specialItem.id,
      null,
      false,
      false)
    this.specialAcountService.creaeteTransaction(transaction).subscribe(res => {
      transaction = res;
      this.userService.setUser(new UserModel(this.user, transaction));
      this.modalCtrl.dismiss()
      if (this.paymentMode == 'online') {
        const url = 'https://zarinp.al/bteam';
        window.location.href  = url;
      }
      this.navCtrl.navigateBack('/tabs/account');
    }, err => {
      this.setToast('شما در حال حاضر اشتراک دارید', 'ios', 3000, 'danger')
    })
  }
}
