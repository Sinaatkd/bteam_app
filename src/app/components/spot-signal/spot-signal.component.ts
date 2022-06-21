import { UserService } from './../../services/user.service';
import { UserModel } from 'src/app/models/user.model';
import axios from 'axios';
import { SignalNewsComponent } from './../signal-news/signal-news.component';
import { ModalController } from '@ionic/angular';
import { SignalsService } from './../../services/signals.service';
import { BASE_SOCKET_API_URL } from './../../utilities/variables';
import { SignalSpotModel } from './../../models/signalSpot.model';
import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-spot-signal',
  templateUrl: './spot-signal.component.html',
  styleUrls: ['./spot-signal.component.scss'],
})
export class SpotSignalComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('signal') signal: SignalSpotModel;
  currentPrice = 0
  isClsoedConnection = false;
  cardTitle: any = 'درحال اتصال';
  cardTitles = [];
  currentIndex = -1;
  user: UserModel;
  animateClassName = 'animate__fadeIn';

  constructor(
    private signalsService: SignalsService,
    private modalCtrl: ModalController,
    private userService: UserService
  ) {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
    window.setInterval(f => {
      this.animateClassName = '';
      setTimeout(() => {
        this.currentIndex = this.currentIndex + 1;
        if (this.cardTitles[this.currentIndex] === -1 || this.cardTitles[this.currentIndex] === undefined) {
          this.cardTitle = this.cardTitles[0]
          this.currentIndex = 0;
        } else {
          this.cardTitle = this.cardTitles[this.currentIndex]
        }
        this.animateClassName = 'animate__fadeIn';
      }, 100);
    }, 3000);
  }


  ngOnDestroy(): void {
    this.isClsoedConnection = true;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.signal.is_active && !this.isClsoedConnection) {
      axios.get(`https://bteam-binance-extractor.iran.liara.run/price/${this.signal.coin_symbol}`).then(res => {
        this.currentPrice = res.data.price;
        this.cardTitles = [this.currentPrice, ...this.signal.alarms.map(alarm => alarm.title)];
        this.checkTargets();
        this.ngAfterViewInit();
      }).catch(err => {
        this.ngAfterViewInit();
      })

    }
  }

  isFullTargetsTouched() {
    return this.signal.targets[this.signal.targets.length - 1].is_touched;
  }

  isFirstTarget(id: number) {
    const firstTarget = this.signal.targets[0];
    return firstTarget.id == id;
  }

  getPricePrevTragetTouched() {
    const prevTarget = this.signal.targets.filter(target => target.is_touched);
    const alarms = [...this.signal.alarms];
    const riskFreeIndex = alarms.map(alarm => alarm.title.includes('ریسک فری')).findIndex(i => i === true);
    alarms[riskFreeIndex] = { id: Math.random(), title: `ریسک فری! حدضرر را ${prevTarget[prevTarget.length - 1].title} تنطیم کنید` }
    this.signal.alarms = alarms;
    return prevTarget[prevTarget.length - 1].amount
  }

  isTargetTouched() {
    return this.signal.targets.filter(target => target.is_touched).length > 0;
  }

  lastTargetTouched() {
    const lastTarget = this.signal.targets.filter(target => target.is_touched);
    return lastTarget[lastTarget.length - 1].title
  }

  openSignalNewsModal() {
    this.modalCtrl.create({
      component: SignalNewsComponent,
      componentProps: {
        news: this.signal.signal_news,
        signalId: this.signal.id,
        kind: 'spot',
      }
    }).then(modalEl => {
      modalEl.present();
      this.seenAllSignalNews();
    });
  }

  checkTargets() {
    if (this.currentPrice < this.signal.stop_loss) {
      if (this.signal.is_touched_entry) {
        if (this.isTargetTouched()) {
          this.signal.status = `${this.lastTargetTouched()} تاچ شد و ریسک فری`;
        } else {
          this.signal.status = 'حد ضرر فعال شد';
        }
        this.signal.is_active = false;
        this.signalsService.deactiveSpotSignal(this.signal.id, this.signal.status).subscribe();
      }
    } else if (this.currentPrice > this.signal.entry && !this.signal.is_touched_entry) {
      this.signalsService.touchEntrySpot(this.signal.id).subscribe();
    }
    for (let target of this.signal.targets.filter(target => !target.is_touched)) {
      if (target.amount < this.currentPrice) {
        if (this.isFirstTarget(target.id)) {
          this.signal.alarms.push({ id: Math.random(), title: 'ریسک فری! حدضرر را نقطه ورود تنطیم کنید' });
          this.signal.stop_loss = this.signal.entry;
        } else {
          this.signal.stop_loss = this.getPricePrevTragetTouched();
        }
        target.is_touched = true;
        this.signalsService.touchTarget(target.id, this.signal.id, 'spot').subscribe();
      }
    }
    if (this.isFullTargetsTouched()) {
      this.signal.is_active = false;
      this.isClsoedConnection = true;
      this.signal.status = 'فول تارگت';
      this.signal.profit_of_signal_amount = (this.signal.entry - this.signal.targets[this.signal.targets.length - 1].amount) * 100
      this.signalsService.deactiveSpotSignal(this.signal.id, this.signal.status).subscribe();
    }
  }



  hasUnreadSignalNews() {
    for (let news of this.signal.signal_news) {
      if (news.seen_by.indexOf(this.user.user.id) === -1) {
        return true;
      }
    }
    return false;
  }

  seenAllSignalNews() {
    for (let news of this.signal.signal_news) {
      news.seen_by.push(this.user.user.id);
    }
  }

}
