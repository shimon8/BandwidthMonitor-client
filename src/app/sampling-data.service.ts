import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  finalize,
  map,
  tap,
  Observable,
  Subject,
} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
export interface CurrentSampling {
  bytes_sent: number;
  bytes_recv: number;
  current_bytes: number;
}
export interface SamplingInfo {
  LastMinSampling: number[];
  Low: string;
  High: string;
}

@Injectable({
  providedIn: 'root',
})
export class SamplingDataService {
  constructor(private http: HttpClient) {}
  timer: any;
  private baseUrl = environment.baseUrl;
  private lowValue: string;
  private highValue: string;
  initSamplingSubject$: Subject<boolean> = new Subject();
  currentSampling$ = new BehaviorSubject<CurrentSampling>({
    bytes_recv: 0,
    bytes_sent: 0,
    current_bytes: 0,
  });

  loadLastMinSampling(): Observable<number[]> {
    return this.http.get<SamplingInfo>(this.baseUrl + '/getSamplingInfo').pipe(
      tap((res) => {
        this.lowValue = res.Low;
        this.highValue = res.High;
      }),
      map((res) => {
        return res.LastMinSampling;
      }),
      finalize(() => this.initSamplingSubject$.next(true))
    );
  }
  loadLastSampling(): Observable<CurrentSampling> {
    return this.http
      .get<CurrentSampling>(this.baseUrl + '/getLastSampling')
      .pipe(map((res) => res));
  }
  getHighValue() {
    return this.highValue;
  }
  getLowValue() {
    return this.lowValue;
  }
}
