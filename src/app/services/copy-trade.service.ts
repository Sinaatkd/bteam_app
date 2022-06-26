import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../utilities/variables';

@Injectable({
  providedIn: 'root'
})
export class CopyTradeService {

  constructor(
    private http: HttpClient
  ) { }


  getBaskets() {
    return this.http.get(BASE_API_URL + 'copy-trade/baskets')
  }

  checkUserAPIs(futuresAPIKey?, futuresSecret?, futuresPassphrase?, spotAPIKey?, spotSecret?, spotPassphrase?): Observable<any> {
    const data = {
      futuresAPIKey, futuresSecret, futuresPassphrase, spotAPIKey, spotSecret, spotPassphrase
    }
    return this.http.post(BASE_API_URL + 'copy-trade/check-user-apis/', data)
  }

  joinToBasket(basketId): Observable<any> {
    return this.http.get(BASE_API_URL + `copy-trade/join/${basketId}/`)
  }

  checkUserJoinedBasket() {
    return this.http.get(BASE_API_URL + 'copy-trade/basket-status')
  }

  create_invoice() {
    const data = {
      currency: 'USDT',
      order_name: Math.random() * 100000,
      order_number: Math.random() * 100000,
      amount: 150,
      callback_url: 'https://google.com',
      api_key: 'Ahh4enUqeZHDXcAeX1HgklFfYMb63I_TzH-aACNUChZEeXGtaw7O8YGHBLBQ5XVn'
    }
    return this.http.get(BASE_API_URL + 'copy-trade/invoice/new/', {params: data})
  }
}
