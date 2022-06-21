import { Component, OnInit } from '@angular/core';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.page.html',
  styleUrls: ['./signals.page.scss'],
})
export class SignalsPage implements OnInit {

  isLoading = true;
  signals = []
  deactiveSignals: any = []
  selectedBtn: 'active' | 'efficiency' = 'active';

  constructor(
    private signalService: SignalsService,
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.signalService.getEfficiencyStats('daily').subscribe(res => {
      this.deactiveSignals = res;
    });
    this.signalService.getAllFuturesSignals().subscribe(res => {
      if (res.length > 0) {
        for (let signal of res) {
          signal['type'] = 'futures'
          this.signals.push(signal)
        }
      }
      this.signalService.getAllSpotSignals().subscribe(res => {
        if (res.length > 0) {
          for (let signal of res) {
            signal['type'] = 'spot'
            this.signals.push(signal)
            this.isLoading = false;
          }
        } else {
          this.isLoading = false;
        }
      });
    });
  }

  changeSelectedButonValue(value: 'active' | 'efficiency') {
    this.selectedBtn = value;
  }

  segmentChanged(event) {
    this.signalService.getEfficiencyStats(event.detail.value).subscribe(res => {
      this.deactiveSignals = res;
    });    
  }
}
