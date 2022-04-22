import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-royal-button',
  templateUrl: './royal-button.component.html',
  styleUrls: ['./royal-button.component.scss'],
})
export class RoyalButtonComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  nagication(path) {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward(path);
  }

  onDismissModal() {
    this.modalCtrl.dismiss();
  }
}
