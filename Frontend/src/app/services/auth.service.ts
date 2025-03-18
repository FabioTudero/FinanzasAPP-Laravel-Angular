import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private readonly TOKEN_KEY = 'auth_token'; // Usamos esta clave en todo el código

  constructor(private http: HttpClient, private router: Router) {}

  getUser(): Observable<User> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/user`, { headers });
  }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { username, password })
      .subscribe((data: any) => {
        if (data['token']) {
          console.log('Token:', data['token']);
          localStorage.setItem(this.TOKEN_KEY, data['token']); // Almacena el token correctamente
          this.router.navigate(['/dashboard']);
        }
      });
  }

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY); // Elimina el token correctamente
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
