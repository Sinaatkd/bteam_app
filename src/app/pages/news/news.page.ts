import { NewsDetailComponent } from './news-detail/news-detail.component';
import { IonSlides, ModalController } from '@ionic/angular';
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
  newsCategories: any[] = [];
  isLoading = true;
  isLoadingCategories = true;
  activeSliderIndex = 0;

  constructor(
    private newsService: NewsService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getNews('all', 10)
    this.getCategories()
  }

  getNews(categorySlug, count) {
    this.isLoading = true;
    this.newsService.getAllNews(categorySlug, count).subscribe((news) => {
      this.news = news;
      this.threeLastNews = this.news.slice(0, 3);
      this.isLoading = false;
    });
  }

  getCategories() {
    this.isLoadingCategories = true;
    this.newsService.getAllNewsCategories().subscribe(categories => {
      this.newsCategories = categories;
      this.isLoadingCategories = false;
    })
  }

  ionViewWillEnter() {
    setInterval(() => {
      if (this.activeSliderIndex >= 2) {
        this.activeSliderIndex = 0;
      } else {
        this.activeSliderIndex += 1;
      }
      this.slider.slideTo(this.activeSliderIndex, 1000).then();
    }, 3000);
  }

  moveToDetailNew(newsTitle) {
    const selectedNews = this.threeLastNews.find(news => news.title === newsTitle)
    this.modalCtrl.create({
      component: NewsDetailComponent,
      componentProps: {
        newsItem: selectedNews,
      },
      swipeToClose: true,
      backdropDismiss: true,
    }).then(modalEl => modalEl.present());
  }

  segmentChanged(event) {
    const categorySlug = event.detail.value;
    this.getNews(categorySlug, 10);
  }
}
