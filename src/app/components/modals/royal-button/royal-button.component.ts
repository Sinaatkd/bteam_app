import { NavController, ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-royal-button',
  templateUrl: './royal-button.component.html',
  styleUrls: ['./royal-button.component.scss'],
})
export class RoyalButtonComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private userService: UserService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() { }

  nagication(path, alwaysMove) {
    this.userService.getUser().subscribe(user => {
      if (alwaysMove || (user.transaction && user.transaction.is_confirmation)) {
        this.modalCtrl.dismiss();
        this.navCtrl.navigateForward(path);
      } else {
        this.alertCtrl.create({
          mode: 'ios',
          header: 'توجه',
          message: 'شما هیچ اشتراکی فعالی ندارید، برای دسترسی به این بخش باید اول اشتراک تهیه کنید.'
        }).then(alertEl => alertEl.present());
      }
    });
  }

  onDismissModal() {
    this.modalCtrl.dismiss();
  }
}
