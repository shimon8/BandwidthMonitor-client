import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SamplingDataService {
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:5000';

  loadLastMinSampling(): Observable<number[]> {

    return this.http.get<any>(this.baseUrl+"/getLastMintueSampling")
    .pipe(
        map(res=>res["LastMinSampling"])
        );
  }
}


