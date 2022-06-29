import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { CopyTradeService } from 'src/app/services/copy-trade.service';

@Component({
  selector: 'app-copy-trade-api',
  templateUrl: './copy-trade-api.component.html',
  styleUrls: ['./copy-trade-api.component.scss'],
})
export class CopyTradeApiComponent implements OnInit {

  copyTradeAPIsForm: FormGroup

  constructor(
    private modalCtrl: ModalController,
    private copyTradeService: CopyTradeService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.copyTradeAPIsForm = new FormGroup({
      futuresAPIKey: new FormControl(null, { validators: [Validators.required] }),
      futuresSecret: new FormControl(null, { validators: [Validators.required] }),
      futuresPassphrase: new FormControl(null, { validators: [Validators.required] }),
      spotAPIKey: new FormControl(null, { validators: [Validators.required] }),
      spotSecret: new FormControl(null, { validators: [Validators.required] }),
      spotPassphrase: new FormControl(null, { validators: [Validators.required] }),
    })
  }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }

  onCheckAPIs() {
    const futuresAPIKey = this.copyTradeAPIsForm.controls.futuresAPIKey.value;
    const futuresSecret = this.copyTradeAPIsForm.controls.futuresSecret.value;
    const futuresPassphrase = this.copyTradeAPIsForm.controls.futuresPassphrase.value;
    const spotAPIKey = this.copyTradeAPIsForm.controls.spotAPIKey.value;
    const spotSecret = this.copyTradeAPIsForm.controls.spotSecret.value;
    const spotPassphrase = this.copyTradeAPIsForm.controls.spotPassphrase.value;
    this.loadingCtrl.create({
      mode: 'ios',
      message: 'لطفا صبر کنید'
    }).then(loadingEl => {
      loadingEl.present()
      this.copyTradeService.checkUserAPIs(futuresAPIKey, futuresSecret, futuresPassphrase, spotAPIKey, spotSecret, spotPassphrase).subscribe(res => {
        loadingEl.dismiss()
        if (res.futures == 200 && res.spot == 200) {
          this.toastCtrl.create({ message: 'API Key های با موفقیت ذخیره شدند', color: 'success', duration: 2000, mode: 'ios' }).then(toastEl => toastEl.present())
          this.modalCtrl.dismiss();
          this.navCtrl.navigateBack('/tabs/home');
        } else if (res.futures == 200 && res.spot != 200) {
          this.toastCtrl.create({ message: 'API Key اسپات شما مورد تایید نیست', color: 'danger', duration: 2000, mode: 'ios' }).then(toastEl => toastEl.present())
        }
        else if (res.futures != 200 && res.spot == 200) {
          this.toastCtrl.create({ message: 'API Key فیوچرز شما مورد تایید نیست', color: 'danger', duration: 2000, mode: 'ios' }).then(toastEl => toastEl.present())
        }
        else if (res.futures != 200 && res.spot != 200) {
          this.toastCtrl.create({ message: 'API Key فیوچرز و اسپات شما مورد تایید نیست', color: 'danger', duration: 2000, mode: 'ios' }).then(toastEl => toastEl.present())
        }
      })
    })
  }

}
