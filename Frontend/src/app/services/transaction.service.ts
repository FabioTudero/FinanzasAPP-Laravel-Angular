import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private route: Router) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/get-categories`);
  }

  addTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-transaction`, transaction).pipe(
      tap(() => {
        this.route.navigate(['/dashboard']);
      })
    );
  }
}
