import { UserService } from './../../services/user.service';
import axios from 'axios';
import { UserModel } from 'src/app/models/user.model';
import { ModalController } from '@ionic/angular';
import { SignalNewsComponent } from './../signal-news/signal-news.component';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SignalFuturesModel } from 'src/app/models/signalFutures.model';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-futures-signal',
  templateUrl: './futures-signal.component.html',
  styleUrls: ['./futures-signal.component.scss'],
})
export class FuturesSignalComponent implements OnInit, OnDestroy {

  @Input('signal') signal: SignalFuturesModel;
  currentPrice = 0;
  isClsoedConnection = false;
  cardTitle: any = 'درحال اتصال';
  cardTitles = [];
  currentIndex = -1;
  animateClassName = 'animate__fadeIn';
  user: UserModel;

  constructor(
    private signalsService: SignalsService,
    private modalCtrl: ModalController,
    private userService: UserService,
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

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.signal.is_active && !this.isClsoedConnection) {
      axios.get(`https://bteam-binance-extractor.iran.liara.run/price/${this.signal.coin_symbol}`).then(res => {
        this.currentPrice = res.data.price;
        this.cardTitles = [this.currentPrice, ...this.signal.alarms.map(alarm => alarm.title)];
        if (this.signal.type_of_investment === 'LONG') this.checkLong();
        else this.checkShort()
        this.ngAfterViewInit();
      }).catch(err => {
        if (this.signal.is_active) {
          this.ngAfterViewInit();
        }

      })
    }
  }


  ngOnDestroy(): void {
    this.isClsoedConnection = true;
  }

  openSignalNewsModal() {
    this.modalCtrl.create({
      component: SignalNewsComponent,
      componentProps: {
        news: this.signal.signal_news,
        signalId: this.signal.id,
        kind: 'futures',
      }
    }).then(modalEl => {
      modalEl.present();
      this.seenAllSignalNews();
    });
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

  isFullTarget() {
    return this.signal.targets[this.signal.targets.length - 1].is_touched
  }

  isTargetTouched() {
    return this.signal.targets.filter(target => target.is_touched).length > 0;
  }

  lastTargetTouched() {
    const lastTarget = this.signal.targets.filter(target => target.is_touched);
    return lastTarget[lastTarget.length - 1].title
  }

  checkLong() {
    if (this.currentPrice < this.signal.stop_loss) {
      if (this.signal.is_touched_entry) {
        this.isClsoedConnection = true;
        if (this.isTargetTouched()) {
          this.signal.status = `${this.lastTargetTouched()} تاچ شد و ریسک فری`;
        } else {
          this.signal.status = 'حد ضرر فعال شد';
        }
        this.signal.is_active = false;
        this.signalsService.deactiveFuturesSignal(this.signal.id, this.signal.status).subscribe();
      }
    } else if (this.currentPrice == this.signal.entry && !this.signal.is_touched_entry) {
      this.signal.is_touched_entry = true;
      this.signalsService.touchEntryFutures(this.signal.id).subscribe();
    }
    for (let target of this.signal.targets.filter(target => !target.is_touched)) {
      if (target.amount < this.currentPrice) {
        if (this.isFirstTarget(target.id)) {
          this.signal.stop_loss = this.signal.entry;
          this.signal.alarms.push({ id: Math.random(), title: 'ریسک فری! حدضرر را نقطه ورود تنطیم کنید' });
        } else {
          this.signal.stop_loss = this.getPricePrevTragetTouched();
        }
        target.is_touched = true;
        this.signalsService.touchTarget(target.id, this.signal.id, 'futures').subscribe();
      }
    }
    if (this.isFullTarget()) {
      this.signal.is_active = false;
      this.isClsoedConnection = true;
      this.signal.status = 'فول تارگت';
      this.signal.profit_of_signal_amount = ((this.signal.entry - this.signal.targets[this.signal.targets.length - 1].amount) * 100) * this.signal.leverage
      this.signalsService.deactiveFuturesSignal(this.signal.id, this.signal.status).subscribe();
    }
  }

  checkShort() {
    if (this.currentPrice > this.signal.stop_loss) {
      if (this.signal.is_touched_entry) {
        this.isClsoedConnection = true;
        if (this.isTargetTouched()) {
          this.signal.status = `${this.lastTargetTouched()} تاچ شد و ریسک فری`;
        } else {
          this.signal.status = 'حد ضرر فعال شد';
        }
        this.signal.is_active = false;
        this.signalsService.deactiveFuturesSignal(this.signal.id, this.signal.status).subscribe();
      }
    } else if (this.currentPrice == this.signal.entry && !this.signal.is_touched_entry) {
      this.signal.is_touched_entry = true;
      this.signalsService.touchEntryFutures(this.signal.id).subscribe();
    }
    for (let target of this.signal.targets.filter(target => !target.is_touched)) {
      if (target.amount > this.currentPrice) {
        if (this.isFirstTarget(target.id)) {
          this.signal.alarms.push({ id: Math.random(), title: 'ریسک فری! حدضرر را نقطه ورود تنطیم کنید' });
          this.signal.stop_loss = this.signal.entry;
        } else {
          this.signal.stop_loss = this.getPricePrevTragetTouched();
        }
        target.is_touched = true;
        this.signalsService.touchTarget(target.id, this.signal.id, 'futures').subscribe();
      }
    }
    if (this.isFullTarget()) {
      this.signal.is_active = false;
      this.isClsoedConnection = true;
      this.signal.status = 'فول تارگت';
      this.signal.profit_of_signal_amount = ((this.signal.entry - this.signal.targets[this.signal.targets.length - 1].amount) * 100) * this.signal.leverage
      this.signalsService.deactiveFuturesSignal(this.signal.id, this.signal.status).subscribe();
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
