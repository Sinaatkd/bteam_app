import { BASE_API_URL, BASE_URL } from './../../../utilities/variables';
import { NewsModel } from './../../../models/news.model';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit {

  baseApiUrl = BASE_URL;
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
