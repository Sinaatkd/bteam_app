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
  isTouchFullTargets = false;
  isClsoedConnection = false;

  constructor(
    private signalsService: SignalsService,
    private modalCtrl: ModalController,
  ) { }


  ngOnDestroy(): void {
    this.isClsoedConnection = true;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.signal.is_active && !this.isClsoedConnection) {
      axios.get(`https://bteam-binance-extractor.iran.liara.run/price/${this.signal.coin_symbol}`).then(res => {
        this.currentPrice = res.data.price;
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

  openSignalNewsModal() {
    this.modalCtrl.create({
      component: SignalNewsComponent,
      componentProps: {
        news: this.signal.signal_news
      }
    }).then(modalEl => modalEl.present());
  }

  checkTargets() {
    if (this.currentPrice < this.signal.stop_loss) {
      if (this.signal.is_touched_entry) {
        this.isClsoedConnection = true;
        this.signal.status = 'حد ضرر فعال شد';
        this.signal.is_active = false;
        this.isClsoedConnection = true;
        this.signalsService.deactiveSpotSignal(this.signal.id, this.signal.status).subscribe();
      }
    } else if (this.currentPrice > this.signal.entry && !this.signal.is_touched_entry) {
      this.signalsService.touchEntrySpot(this.signal.id).subscribe();
    }
    for (let target of this.signal.targets.filter(target => !target.is_touched)) {
      if (target.amount < this.currentPrice) {
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
}
