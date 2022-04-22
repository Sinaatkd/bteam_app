import { NewsService } from '../../services/news.service';
import { NewsModel } from './../../models/news.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  news: NewsModel[] = [];
  isLoading = true;
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
  }
  
  ionViewDidEnter() {
    this.newsService.allNewsConnection()
    this.newsService.getAllNews().subscribe(news => {
      this.news = news;
      this.isLoading = false;
    })
  }

}
