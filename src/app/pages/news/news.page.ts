import { IonSlides } from '@ionic/angular';
import { BASE_URL } from 'src/app/utilities/variables';
import { NewsService } from '../../services/news.service';
import { NewsModel } from './../../models/news.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  @ViewChild('slides') slider: IonSlides;

  news: NewsModel[] = [];
  threeLastNews: NewsModel[] = [];
  isLoading = true;
  BASE_URL = BASE_URL;
  activeSliderIndex = 0;

  slideOpts = {
    slidesPerView: 1,
  };

  constructor(private newsService: NewsService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.newsService.allNewsConnection();
    this.newsService.getAllNews().subscribe((news) => {
      this.news = news;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.threeLastNews = this.news.slice(0, 3);
      console.log('i am here');
    }, 500);

    setTimeout(() => {
      this.slideOpts.slidesPerView = 2;
    }, 3000);

    setInterval(() => {
      if (this.activeSliderIndex >= 2) {
        this.activeSliderIndex = 0;
      } else {
        this.activeSliderIndex += 1;
      }
      this.slider.slideTo(this.activeSliderIndex, 1000).then();
    }, 3000);
  }

  ionSlideDrag(event) {
    console.log(event);
  }
}
