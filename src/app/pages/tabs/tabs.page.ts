import { Device } from '@capacitor/device';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { RoyalButtonComponent } from 'src/app/components/modals/royal-button/royal-button.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  openActionSheetRoyalItems() {
    this.onClick();
    this.modalCtrl.create({
      initialBreakpoint: 1,
      handle: false,
      breakpoints: [1, 0],
      component: RoyalButtonComponent,
      cssClass: 'royal-button',
      mode: 'ios',
      swipeToClose: true,
      backdropDismiss: true,
      showBackdrop: false
    }).then(modalEl => modalEl.present());
  }

  onClick() {
    Device.getInfo().then(value => {
      if (value.platform !== 'ios') {
        navigator.vibrate(50);
      }
    });
  }
}
