import { BASE_API_URL } from './../utilities/variables';
import { GiftsInfoModel } from './../models/gifts.info.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BteamPartyService {

  constructor(
    private http: HttpClient
  ) { }


  getGiftsInfo(): Observable<GiftsInfoModel> {
    return this.http.get<GiftsInfoModel>(`${BASE_API_URL}gifts-info/`)
  }

  useGift(gift_type: 'red-b' | 'blue-b' | 'black-b', gift_item: 'free-transaction' | 'discount' | 'cash'): Observable<any> {
    return this.http.post(`${BASE_API_URL}use-gift/`, { gift_type, gift_item })
  }

  giftsLog() {
    return this.http.get(`${BASE_API_URL}gifs-log/`)
  }

  cashWithdrawal(bank_card_number: number, amount: number, user: number) {
    return this.http.post(`${BASE_API_URL}create-cash-withdrawal/`, {bank_card_number, amount, user})
  }
}
