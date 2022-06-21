import { SignalsService } from './../../services/signals.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-signal-news',
  templateUrl: './signal-news.component.html',
  styleUrls: ['./signal-news.component.scss'],
})
export class SignalNewsComponent implements OnInit, AfterViewInit {

  @Input('signalNews') signalNews;
  @Input('signalId') signalId;
  @Input('kind') kind;

  constructor(
    private modalCtrl: ModalController,
    private navParam: NavParams,
    private signalsService: SignalsService
  ) { }

  ngOnInit() {
    this.signalNews = this.navParam.get('news');
    this.signalId = this.navParam.get('signalId');
    this.kind = this.navParam.get('kind');
  }

  ngAfterViewInit(): void {
    this.signalsService.sennAllSignalMessage(this.signalId, this.kind).subscribe(res => {

    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
