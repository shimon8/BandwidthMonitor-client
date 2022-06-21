import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SamplingDataService {
  constructor(private http: HttpClient) { }
  private baseUrl = environment.baseUrl;

  loadLastMinSampling(): Observable<number[]> {

    return this.http.get<any>(this.baseUrl+"/getLastMintueSampling")
    .pipe(
        map(res=>res["LastMinSampling"])
        );
  }
  loadLastSampling(): Observable<any> {
    return this.http.get<any>(this.baseUrl+"/getLastSampling").pipe(
      map(res=>res)
      );
  }
}


