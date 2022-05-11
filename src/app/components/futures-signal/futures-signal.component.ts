import axios from 'axios';
import { BASE_SOCKET_API_URL } from './../../utilities/variables';
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

  constructor(
    private signalsService: SignalsService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.signal.is_active && !this.isClsoedConnection) {
      axios.get(`https://bteam-binance-extractor.iran.liara.run/price/${this.signal.coin_symbol}`).then(res => {
        this.currentPrice = res.data.price;
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
        news: this.signal.signal_news
      }
    }).then(modalEl => modalEl.present());
  }

  isFullTargetsShort() {
    return this.signal.targets[this.signal.targets.length - 1].is_touched
  }

  isFullTargetsLong() {
    return this.signal.targets[this.signal.targets.length - 1].is_touched;
  }

  checkLong() {
    if (this.currentPrice < this.signal.stop_loss) {
      if (this.signal.is_touched_entry) {
        this.isClsoedConnection = true;
        this.signal.status = 'حد ضرر فعال شد';
        this.signal.is_active = false;
        this.isClsoedConnection = true;
        this.signalsService.deactiveFuturesSignal(this.signal.id, this.signal.status).subscribe();
      }
    } else if (this.currentPrice > this.signal.entry && !this.signal.is_touched_entry) {
      this.signal.is_touched_entry = true;
      this.signalsService.touchEntryFutures(this.signal.id).subscribe();
    }
    for (let target of this.signal.targets.filter(target => !target.is_touched)) {
      if (target.amount < this.currentPrice) {
        target.is_touched = true;
        this.signalsService.touchTarget(target.id, this.signal.id, 'futures').subscribe();
      }
    }
    if (this.isFullTargetsLong()) {
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
        this.signal.status = 'حد ضرر فعال شد';
        this.signal.is_active = false;
        this.isClsoedConnection = true;
        this.signalsService.deactiveFuturesSignal(this.signal.id, this.signal.status).subscribe();
      }
    } else if (this.currentPrice < this.signal.entry && !this.signal.is_touched_entry) {
      this.signal.is_touched_entry = true;
      this.signalsService.touchEntryFutures(this.signal.id).subscribe();
    }
    for (let target of this.signal.targets.filter(target => !target.is_touched)) {
      if (target.amount > this.currentPrice) {
        target.is_touched = true;
        this.signalsService.touchTarget(target.id, this.signal.id, 'futures').subscribe();
      }
    }
    if (this.isFullTargetsShort()) {
      this.signal.is_active = false;
      this.isClsoedConnection = true;
      this.signal.status = 'فول تارگت';
      this.signal.profit_of_signal_amount = ((this.signal.entry - this.signal.targets[this.signal.targets.length - 1].amount) * 100) * this.signal.leverage
      this.signalsService.deactiveFuturesSignal(this.signal.id, this.signal.status).subscribe();
    }
  }
}
