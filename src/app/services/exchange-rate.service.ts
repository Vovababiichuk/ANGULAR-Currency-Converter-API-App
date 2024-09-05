import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/interfaces';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = `https://data.fixer.io/api/latest?access_key=${environment.apiKey}&symbols=USD,UAH,EUR`;

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map((response: ApiResponse) => {
        if (response.success) {
          return response;
        } else {
          throw new Error(response.error || 'API Error');
        }
      }),
      catchError((error) => {
        console.error('HTTP Error:', error);
        throw error;
      })
    );
  }
}
