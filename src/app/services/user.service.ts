import { UserModel } from './../models/user.model';
import { BASE_API_URL } from './../utilities/variables';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: BehaviorSubject<UserModel> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
  ) { }


  getUserInfo(): Observable<UserModel> {
      return this.http.get<UserModel>(BASE_API_URL + 'user/')
  }

  editUserInfo(user: UserModel): Observable<UserModel['user']> {
    return this.http.put<UserModel['user']>(`${BASE_API_URL}user/${user.user.id}/`, user.user);
  }

  setUser(user: UserModel) {
    this._user.next(user);
  }

  getUser() {
    return this._user.asObservable();
  }

  getUserMessages() {
    return this.http.get(`${BASE_API_URL}user/messages/`);
  }
  
  seenAllMessage() {
    return this.http.get(`${BASE_API_URL}user/messages/seen-all/`);
  }
}
