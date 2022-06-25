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
}
