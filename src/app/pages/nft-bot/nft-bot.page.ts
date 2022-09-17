import {Component, OnInit} from '@angular/core';
import {Clipboard} from "@capacitor/clipboard";
import {NFTBotService} from "../../services/nft-bot.service";
import {AlertController, NavController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-nft-bot',
  templateUrl: './nft-bot.page.html',
  styleUrls: ['./nft-bot.page.scss'],
})
export class NftBotPage implements OnInit {

  isLoading = true;
  alarms: any[] = []

  constructor(
    private nftBotService: NFTBotService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
  }


  ngOnInit() {
    this.updateAlarms('24h');
  }

  filterModeChanged(event) {
    this.updateAlarms(event.detail.value)
  }

  updateAlarms(filterMode) {
    this.isLoading = true;
    this.nftBotService.getAlarms(filterMode).subscribe(alarms => {
      this.alarms = alarms;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      if (error.status === 403) {
        this.alertCtrl.create({
          message: 'شما به این بخش دسترسی ندارید.',
          mode: 'ios',
          backdropDismiss: false,
          buttons: [{
            text: 'برگشت به صفحه ی اصلی',
            handler: () => {
              this.navCtrl.navigateBack('/tabs/home');
            }
          }]
        }).then(alertEl => alertEl.present())
      }
    });
  }

  copyNFTName(nftName) {
    Clipboard.write({string: nftName}).then(res => {
      this.toastCtrl.create({
        message: 'نام NFT کپی شد',
        color: 'success',
        duration: 2000,
        mode: 'ios'
      }).then(toastEl => toastEl.present());
    });
  }

  openNFTAddress() {

  }
}
