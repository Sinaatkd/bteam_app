import { UserService } from './../../../services/user.service';
import { UserModel } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { SendReceiptComponent } from 'src/app/components/modals/send-receipt/send-receipt.component';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  unreadMessages: UserModel['unread_messages'];
  user: UserModel['user'];
  userTransaction: UserModel['transaction'];
  numberOfDaysRemaining = 0

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {    
    this.userService.getUser().subscribe(user => {
      this.user = user.user;
      this.unreadMessages = user.unread_messages;
      this.userTransaction = user.transaction;
    });
  }

  ionViewDidEnter() {
    var currentDate = Date.now();
    let dateOfApproval: any = new Date(this.userTransaction.date_of_approval)
    dateOfApproval = dateOfApproval.setDate(dateOfApproval.getDate()+(this.userTransaction.validity_rate + 1));
    if (this.userTransaction && this.userTransaction.date_of_approval){
      this.numberOfDaysRemaining = Math.floor(this.getDifferenceInDays(dateOfApproval, currentDate)); 
    }
  }
  getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  setToast(message: string, mode: 'ios' | 'md', duration: number, color: 'success' | 'warning' | 'danger') {
    this.toastCtrl.create(
      { message, mode, duration, color }
    ).then(toastEl => toastEl.present());
  }

  openSendReceiptModal() {
    this.modalCtrl.create({
      initialBreakpoint: 1,
      breakpoints: [1],
      component: SendReceiptComponent,
      componentProps: {
        user: this.user,
        transaction: this.userTransaction,
      },
      cssClass: 'modal',
      mode: 'ios',
      swipeToClose: true,
      backdropDismiss: true,
      
    }).then(modalEl => modalEl.present());

  }

  onLogoutUser() {
    Storage.remove({key: 'token'}).then(() => {
      this.navCtrl.navigateBack('/login')
    })
  }

}
