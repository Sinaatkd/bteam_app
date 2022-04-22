import { UserService } from './../../../services/user.service';
import { NavController, ToastController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.scss'],
})
export class ShowResultComponent implements OnInit {

  @Input('giftResultInfo') giftResultInfo;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private userService: UserService,
  ) { }

  ngOnInit() {
    
    if (this.giftResultInfo.gift_item === 'free-transaction') {
      this.userService.getUserInfo().subscribe(user => {
        this.userService.setUser(user);
      })
    }
  }

  moveToAccountPage() {
    this.navCtrl.navigateBack('/tabs/home');
  }

  copyCode() {
    if (this.giftResultInfo.gift_item === 'discount') {
      Clipboard.write({ string: this.giftResultInfo.gift_detail }).then(res => {
        this.toastCtrl.create({ duration: 1500, color: 'success', message: 'کپی شد', mode: 'ios' }).then(toastEl => toastEl.present());
      })
      // 
    }
  }
}
