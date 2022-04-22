import { ModalController, NavParams } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-signal-news',
  templateUrl: './signal-news.component.html',
  styleUrls: ['./signal-news.component.scss'],
})
export class SignalNewsComponent implements OnInit {

  @Input('signalNews') signalNews;

  constructor(
    private modalCtrl: ModalController,
    private navParam: NavParams
  ) { }

  ngOnInit() { 
    this.signalNews = this.navParam.get('news');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
