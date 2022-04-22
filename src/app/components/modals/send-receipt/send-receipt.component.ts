import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, LoadingController } from '@ionic/angular';
import { TransactionDTO } from 'src/app/DTOs/createTransaction.dto';
import { UserModel } from 'src/app/models/user.model';
import { SpecialAccountService } from 'src/app/services/special-account.service';

@Component({
  selector: 'app-send-receipt',
  templateUrl: './send-receipt.component.html',
  styleUrls: ['./send-receipt.component.scss'],
})
export class SendReceiptComponent implements OnInit {

  segmentValue: 'info' | 'send-receipt' = 'info';
  user: UserModel['user'];
  transaction: UserModel['transaction'];
  selectedReceiptImage;
  isSelectedReceiptImage = false;

  constructor(
    private toastCtrl: ToastController,
    private specialAccountService: SpecialAccountService,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private userService: UserService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.transaction = this.navParams.get('transaction');
    this.user = this.navParams.get('user');
  }

  imageChanged(event) {
    this.getBase64(event.target.files[0]);
  }

  setToast(message: string, mode: 'ios' | 'md', duration: number, color: 'success' | 'warning' | 'danger') {
    this.toastCtrl.create(
      { message, mode, duration, color }
    ).then(toastEl => toastEl.present());
  }

  getBase64(file) {
    let me = this;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.selectedReceiptImage = reader.result;
      me.isSelectedReceiptImage = true;
    };
    reader.onerror = function (error) {
    };
  }

  onSubmitPayment() {
    this.loadingCtrl.create({
      mode: 'ios',
      message: 'لطفا صبر کنید'
    }).then(loadingElement => {
      loadingElement.present()
      this.specialAccountService.sendReceipt(new TransactionDTO(this.transaction.id,
        this.transaction.payment_mode,
        this.transaction.amount, this.transaction.validity_rate, this.transaction.transaction_status,
        this.transaction.consultant_name, this.user.id, null, null, this.selectedReceiptImage)).subscribe(res => {
        loadingElement.dismiss()
        this.transaction.is_processing = true;
        this.transaction.is_send_receipt = true;
        this.transaction.transaction_status = 'درحال پردازش';
        this.modalCtrl.dismiss()
      }, err => {
        loadingElement.dismiss()
      })
    })
    }
    
    segmentChanged(event) {
      this.segmentValue = event.detail.value
  }

  onCancel() {
    this.specialAccountService.cancelSpecialAccountTransaction().subscribe(res => {
      this.userService.getUser().subscribe(user => {
        const u = user;
        u.transaction = null;
        this.userService.setUser(u);
        this.modalCtrl.dismiss();
      });
    });
  }
}
