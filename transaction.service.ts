import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(startDate: string, endDate: string): Observable<Transaction[]> {
    let params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get<Transaction[]>(this.apiUrl, { params });
  }
}
