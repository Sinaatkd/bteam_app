import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-copy-trade',
  templateUrl: './copy-trade.page.html',
  styleUrls: ['./copy-trade.page.scss'],
})
export class CopyTradePage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor() {
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true).then();
  }

  ngOnInit() {
  }

  moveToNextSlide() {
    console.log('i am here');
    this.slides.lockSwipes(false).then();
    this.slides.slideNext().then();
    this.slides.lockSwipes(true).then();
  }

}
