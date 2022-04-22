import { BteamPartyService } from './../../../services/bteam-party.service';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from './../../../services/user.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-use-blue-card',
  templateUrl: './use-blue-card.component.html',
  styleUrls: ['./use-blue-card.component.scss'],
})
export class UseBlueCardComponent implements OnInit {
  @Input('cardCode') cardCode: string;
  @Output() getGiftResponseEmitter = new EventEmitter();
  userPhonenumberAndFullname: string;
  selectedGift: 'free-transaction' | 'discount';
  isConfirmInfo = false;

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private bteamPartyService: BteamPartyService
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.userPhonenumberAndFullname = `${res.user.full_name}  -  0${res.user.phone_number}`
    });
  }


  chooseGift(action) {
    this.selectedGift = action;
  }

  changeConfirmInfo(event) {
    this.isConfirmInfo = event.detail.checked;
  }


  exitFromPage() {
    this.navCtrl.navigateBack('/tabs/account')
  }


  onContinueButtonClicked() {
    if (!this.isConfirmInfo) {
      this.toastCtrl.create({ mode: 'ios', duration: 1000, color: 'danger', message: 'لطفا صحت اطلاعات را تایید نمایید' }).then(toastEl => toastEl.present());
      return
    };
    if (this.selectedGift === null || this.selectedGift === undefined) {
      this.toastCtrl.create({ mode: 'ios', duration: 1000, color: 'danger', message: 'لطفا جایزه خود را انتخاب نمایید' }).then(toastEl => toastEl.present());
      return
    }

    this.bteamPartyService.useGift('blue-b', this.selectedGift).subscribe(res => {
      this.getGiftResponseEmitter.emit(res)
    }, err => {
      this.toastCtrl.create({ message: 'کارت مورد نظر پیدا نشد.', duration: 1000, color: 'danger', mode: 'ios' }).then(toastEl => toastEl.present());
    });
  }

}
