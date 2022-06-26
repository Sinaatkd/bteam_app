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

  createInvoice(): Observable<any> {
    const data = {
      api_key: 'Ahh4enUqeZHDXcAeX1HgklFfYMb63I_TzH-aACNUChZEeXGtaw7O8YGHBLBQ5XVn',
      currency  : 'USDT',
      order_name: 'fs',
      callback_url: BASE_API_URL + 'copy-trade/stage/check-payment/15',
      order_number: Math.random() * 10000,
      amount: 150,
    }
    return this.http.get('https://plisio.net/api/v1/invoices/new', {params: data})
  }
}
