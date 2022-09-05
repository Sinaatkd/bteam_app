import { HttpClient } from '@angular/common/http';
import { BASE_SOCKET_API_URL, BASE_API_URL } from './../utilities/variables';
import { NewsModel } from '../models/news.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private _news: BehaviorSubject<NewsModel[]> = new BehaviorSubject(null);
    private _threeLastNews: BehaviorSubject<NewsModel[]> = new BehaviorSubject(null);
    ws: WebSocket;


    constructor(
        private http: HttpClient
    ) {

    }

    private reConnect(event) {
        this.ws = new WebSocket(this.ws.url);
    }

    private connected(event: any) {
        
    }

    allNewsConnection() {
        this.ws = new WebSocket(BASE_SOCKET_API_URL + "news/");
        this.ws.onopen = (event) => this.connected(event)
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event['data'])['data']
            this.setAllNews(data);
        }
        this.ws.onclose = (event) => this.reConnect(event)
    }

    threeLastNewsConnection() {
        this.ws = new WebSocket(BASE_SOCKET_API_URL + "three-last-news/");
        this.ws.onopen = (event) => { this.connected(event) }
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event['data'])['data']
            this.setThreeLastNews(data);
        }
        this.ws.onclose = (event) => { this.reConnect(event) }
    }

    getAllNews(): Observable<NewsModel[]> {
        return this._news.asObservable();
    }

    getThreeLastNews(): Observable<NewsModel[]> {
        return this._threeLastNews.asObservable();
    }

    getAllNewsCategories(): Observable<any[]> {
        console.log(`${BASE_API_URL}news-categories`);
        
        return this.http.get<any[]>(`${BASE_API_URL}news-categories`);
    }

    private setAllNews(news) {
        this._news.next(news);
    }

    private setThreeLastNews(news) {
        this._threeLastNews.next(news);
    }
}