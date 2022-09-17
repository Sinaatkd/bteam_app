import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from "../utilities/variables";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NFTBotService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAlarms(filterMode): Observable<any> {
    return this.http.get(`${BASE_API_URL}nft/alarms`, {params: {filter_mode: filterMode}})
  }
}
