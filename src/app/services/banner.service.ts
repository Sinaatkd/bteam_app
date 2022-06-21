import { BASE_API_URL } from './../utilities/variables';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private http: HttpClient
  ) { }

  getBanners() {
  return this.http.get<{img: string, link: string}[]>(`${BASE_API_URL}banners`)
  }
}
