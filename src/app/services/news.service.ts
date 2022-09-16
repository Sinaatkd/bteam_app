import {HttpClient} from '@angular/common/http';
import {BASE_SOCKET_API_URL, BASE_API_URL} from './../utilities/variables';
import {NewsModel} from '../models/news.model';
import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) {

  }

  getAllNewsCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_API_URL}news-categories`);
  }

  getAllNews(categorySlug) {
    return this.http.get<any[]>(`${BASE_API_URL}news/${categorySlug}`);
  }
}
