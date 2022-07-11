import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { CopyTradeService } from 'src/app/services/copy-trade.service';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { CopyTradeApiComponent } from 'src/app/components/copy-trade-api/copy-trade-api.component';

@Component({
  selector: 'app-copy-trade',
  templateUrl: './copy-trade.page.html',
  styleUrls: ['./copy-trade.page.scss'],
})
export class CopyTradePage implements OnInit {

  user: UserModel;
  isUserKucoinAPIsActive: boolean
  isCheckUserAPIsLoading = true;
  isJoindToAnyBasket = false;
  userBasketJoined: any;
  baskets: any = [];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true
  }

  constructor(
    private userService: UserService,
    private copyTradeService: CopyTradeService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ionViewDidEnter() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      if (this.user.user.is_full_authentication) {
        this.copyTradeService.checkUserJoinedBasket().subscribe(res => {
          this.isJoindToAnyBasket = true;
          this.userBasketJoined = res;
        }, err => {
          this.copyTradeService.getBaskets().subscribe(res => {
            this.baskets = res;
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.copyTradeService.checkUserAPIs().subscribe(res => {
      if (res.futures == 200 && res.spot == 200) {
        this.isUserKucoinAPIsActive = true;
        this.isCheckUserAPIsLoading = false;
      } else {
        this.isUserKucoinAPIsActive = false;
        this.isCheckUserAPIsLoading = false;
      }
    })
  }

  enterAPIKeys() {
    if (this.isUserKucoinAPIsActive) {
      this.alertCtrl.create({
        message: 'آیا می خواهید api ها ار قطع کنید؟',
        mode: 'ios',
        buttons: [
          {
            text: 'خیر'
          },
          {
            text: 'بله',
            handler: () => {
              this.copyTradeService.disconnectApiKey().subscribe(res => {
                this.navCtrl.navigateBack('/tabs/home')
              });
            }
          }
        ]
      }).then(alertEl => alertEl.present())
    } else {

      this.modalCtrl.create({
        component: CopyTradeApiComponent,
      }).then(modalEl => modalEl.present());
    }
  }

  isUserCanLeftFromBasket() {
    const stage = this.userBasketJoined.stages.filter(s => s.is_pay_time == true)
    const lastStage = stage[stage.length - 1]

    return !(lastStage.payers.filter(p => p == this.user.user.id).length > 0);
  }

  joinToBasket(basketId) {
    this.loadingCtrl.create({
      message: 'لطفا صبر کنید',
      mode: 'ios'
    }).then(loadingEl => {
      loadingEl.present();
      this.copyTradeService.joinToBasket(basketId).subscribe(res => {
        loadingEl.dismiss();
        this.toastCtrl.create({
          message: res.message,
          mode: 'ios',
          color: 'success',
          duration: 2000,
        }).then(toastEl => toastEl.present());
        this.navCtrl.navigateBack('/tabs/home')
      }, err => {
        loadingEl.dismiss();
        this.toastCtrl.create({
          message: err.error.message,
          mode: 'ios',
          color: 'danger',
          duration: 2000,
        }).then(toastEl => toastEl.present());
      })
    })
  }

  onPayStage(stageId) {
    const selectedStage = this.userBasketJoined.stages.filter(s => s.id === stageId)[0];
    if (!this.isPayThisStage(stageId) && selectedStage.is_pay_time) {
      this.loadingCtrl.create({ mode: 'ios', message: 'لطفا صبر کنید' }).then(loadingEl => {
        loadingEl.present()
        this.copyTradeService.createInvoice(stageId).subscribe(res => {
          loadingEl.dismiss();
          window.location.href = res.invoice_url;
        });
      })
    }
  }

  isPayThisStage(stageId) {
    const selectedStage = this.userBasketJoined.stages.filter(s => s.id === stageId)[0];
    return selectedStage.payers.filter(p => p == this.user.user.id).length > 0
  }

  leftFromBasket() {
    this.loadingCtrl.create({
      message: 'لطفا صبر کنید',
      mode: 'ios'
    }).then(loadingEl => {
      loadingEl.present();
      this.copyTradeService.leftFromBasket().subscribe(res => {
        this.navCtrl.navigateBack('/tabs/home');
        loadingEl.dismiss();
      })
    });
  }
}
