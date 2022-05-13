import { SignalSpotModel } from './../models/signalSpot.model';
import { SignalFuturesModel } from './../models/signalFutures.model';
import { BASE_API_URL } from './../utilities/variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllSpotSignals(): Observable<SignalSpotModel[]> {
    return this.http.get<SignalSpotModel[]>(`${BASE_API_URL}signals/spot/`)
  }

  getAllFuturesSignals(): Observable<SignalFuturesModel[]> {
    return this.http.get<SignalFuturesModel[]>(`${BASE_API_URL}signals/futures/`)
  }

  deactiveSpotSignal(id, status) {
    return this.http.get(`${BASE_API_URL}signals/spot/deactive/`, { params: { id, status } })

  }

  deactiveFuturesSignal(id, status) {
    return this.http.get(`${BASE_API_URL}signals/futures/deactive/`, { params: { id, status } })
  }


  touchTarget(id, signalId, kind: 'spot' | 'futures') {
    return this.http.get(`${BASE_API_URL}signals/touch-target/`, { params: { id, kind, signal_id: signalId } })
  }

  touchEntryFutures(id): Observable<any> {
    return this.http.get(`${BASE_API_URL}signals/futures/touch-entry/`, { params: { id } })
  }

  touchEntrySpot(id): Observable<any> {
    return this.http.get(`${BASE_API_URL}signals/spot/touch-entry/`, { params: { id } })
  }


  getSignalsGeneralStats() {
    return this.http.get(`${BASE_API_URL}signals/general-stats/`)
  }

  getEfficiencyStats(range) {
    return this.http.get(`${BASE_API_URL}signals/efficiency/`, { params: { range } })
  }

  sennAllSignalMessage(signalId, kind: 'futures' | 'spot') {
    return this.http.get(`${BASE_API_URL}signals/news/`, { params: { signal_id: signalId, kind } })
  }
}
