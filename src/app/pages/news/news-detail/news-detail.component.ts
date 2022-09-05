import { NewsModel } from './../../../models/news.model';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit {

  detail: NewsModel;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.detail = this.navParams.get('newsItem');    
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
