import { BASE_URL } from 'src/app/utilities/variables';
import { NewsDetailComponent } from './../../pages/news/news-detail/news-detail.component';
import { NewsModel } from './../../models/news.model';
import { NavController, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-component',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  @Input('clickable') clickable: boolean | false;
  @Input('news') news: NewsModel;

  BASE_URL = BASE_URL;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  getDate() {
    return this.news.updated_time;
  }

  moveToDetailNew() {
    if (this.clickable) {
      this.modalCtrl.create({
        component: NewsDetailComponent, 
        componentProps: {
          newsItem: this.news,
        },
        swipeToClose: true,
        backdropDismiss: true,
      }).then(modalEl => modalEl.present());
    }
  }
}
