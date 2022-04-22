import { GiftsInfoModel } from './../../models/gifts.info.model';
import { BteamPartyService } from './../../services/bteam-party.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-bteam-party',
  templateUrl: './bteam-party.page.html',
  styleUrls: ['./bteam-party.page.scss'],
})
export class BteamPartyPage implements OnInit {

  @ViewChild('slides') slidefromHtml: IonSlides;
  cardCode: string = 'شما کارت ندارید';
  selectedGiftCard: { title: 'blue-b' | 'black-b' | 'red-b', index: number } = {
    title: 'blue-b',
    index: 1
  }
  isUseCardClicked = false;

  sliderOptions = {
    initialSlide: this.selectedGiftCard.index,
    slidesPerView: 1.3,
    centeredSlides: true,
    spaceBetween: 20,
    autoHeight: true
  }

  gifts: GiftsInfoModel;
  isLoading = true;
  cashWithdrawalDisabled = true;
  useGiftButtonDisabled = true;
  isShowResult = false;
  isshowCashWithdrawalComponent = false;
  giftResultInfo = {}

  constructor(
    private bteamPartyService: BteamPartyService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.bteamPartyService.getGiftsInfo().subscribe(res => {
      this.gifts = res;
      this.isLoading = false;
    })
  }

  onSliderChanged(event) {
    this.isUseCardClicked = false;
    this.isshowCashWithdrawalComponent = false;
    this.isShowResult = false;
    this.slidefromHtml.getActiveIndex().then(index => {
      if (this.gifts) {
        if (index === 0) {
          // red b card selected
          this.checkUserRedBCard();
        } else if (index === 1) {
          this.checkUserBlueBCard();

        } else if (index === 2) {
          this.checkUserBlackBCard();
        }
      }
    });
  }

  checkUserRedBCard() {
    this.selectedGiftCard = {
      title: 'red-b',
      index: 0
    };
    this.cashWithdrawalDisabled = true;
    if (this.gifts.red_b.active_count <= 0) {
      this.useGiftButtonDisabled = true;
      if (this.gifts.red_b.all_card_count >= 1) {
        const code = this.gifts.red_b.code
        this.cardCode = `${code.slice(10, 12)}  -  ${code.slice(7, 10)}  -  ${code.slice(3, 7)}  -  ${code.slice(0, 3)}`;
      } else {
        this.cardCode = 'شما کارت ندارید';
      }
    } else {
      const code = this.gifts.red_b.code
      this.cardCode = `${code.slice(10, 12)}  -  ${code.slice(7, 10)}  -  ${code.slice(3, 7)}  -  ${code.slice(0, 3)}`;
      this.useGiftButtonDisabled = false;

    }
  }

  checkUserBlueBCard() {
    this.selectedGiftCard = {
      title: 'blue-b',
      index: 1,
    }
    this.cashWithdrawalDisabled = true;
    if (this.gifts.blue_b.active_count <= 0) {
      this.useGiftButtonDisabled = true;
      if (this.gifts.blue_b.all_card_count >= 1) {
        const code = this.gifts.red_b.code
        this.cardCode = `${code.slice(10, 12)}  -  ${code.slice(7, 10)}  -  ${code.slice(3, 7)}  -  ${code.slice(0, 3)}`;
      } else {
        this.cardCode = 'شما کارت ندارید';
      }
    } else {
      const code = this.gifts.blue_b.code
      this.cardCode = `${code.slice(10, 12)}  -  ${code.slice(7, 10)}  -  ${code.slice(3, 7)}  -  ${code.slice(0, 3)}`;
      this.useGiftButtonDisabled = false;
    }
  }
  checkUserBlackBCard() {
    this.cashWithdrawalDisabled = false;
    this.selectedGiftCard = {
      title: 'black-b',
      index: 2
    }
    if (this.gifts.black_b.active_count <= 0) {
      this.useGiftButtonDisabled = true;
      if (this.gifts.black_b.all_card_count >= 1) {
        const code = this.gifts.black_b.code
        this.cardCode = `${code.slice(10, 12)}  -  ${code.slice(7, 10)}  -  ${code.slice(3, 7)}  -  ${code.slice(0, 3)}`;
      } else {
        this.cardCode = 'شما کارت ندارید';
      }
    } else {
      const code = this.gifts.black_b.code
      this.cardCode = `${code.slice(10, 12)}  -  ${code.slice(7, 10)}  -  ${code.slice(3, 7)}  -  ${code.slice(0, 3)}`;
      this.useGiftButtonDisabled = false;
    }
  }

  copyUserCode() {
    Clipboard.write({ string: this.gifts.user_code.toString() }).then(res => {
      this.toastCtrl.create({ message: 'کپی شد', duration: 1000, mode: 'ios', color: 'success' }).then(toastEl => toastEl.present());
    })
  }

  useGiftCard() {
    this.isUseCardClicked = true;
    if (this.selectedGiftCard.title === 'red-b') {

    }
  }

  getGiftResponseEmitter($event) {
    const res = $event;
    this.isShowResult = true;


    if (res.info.gift_type === 'red-b') {
      this.gifts.red_b.active_count -= 1

      if (this.gifts.red_b.active_count <= 0) {
        this.useGiftButtonDisabled = true;
      }
    } else if (res.info.gift_type === 'black-b') {
      this.gifts.black_b.active_count -= 1

      if (this.gifts.black_b.active_count <= 0) {
        this.useGiftButtonDisabled = true;
      }
    } else if (res.info.gift_type === 'blue-b') {
      this.gifts.blue_b.active_count -= 1

      if (this.gifts.blue_b.active_count <= 0) {
        this.useGiftButtonDisabled = true;
      }
    }

    this.giftResultInfo = res.info;

  }

  showCashWithdrawalComponent() {
this.isshowCashWithdrawalComponent = true;
  }
}