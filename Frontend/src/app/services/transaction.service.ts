import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Balance } from '../interfaces/balance';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrl;
  user_id: number | undefined;

  constructor(private http: HttpClient, private route: Router) { }

  getCategories(): Observable<Category[]> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Category[]>(`${this.apiUrl}/get-categories`, { headers }); 
  }

  addTransaction(transaction: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }
    return this.http.post(`${this.apiUrl}/add-transaction`, { token, transaction }).pipe(
      tap(() => {
        this.route.navigate(['/dashboard']);
      })
    );
  }

  getBalance(): Observable<Balance> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Balance>(`${this.apiUrl}/get-balance`, { headers });
  }

  getTransactions(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/get-transactions`, { headers });
  }
}
