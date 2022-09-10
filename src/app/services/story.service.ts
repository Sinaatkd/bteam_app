import { Observable } from 'rxjs';
import { BASE_API_URL } from './../utilities/variables';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(
    private http: HttpClient
  ) { }

  getStories(): Observable<any> {
    return this.http.get(`${BASE_API_URL}stories`);
  }
}
