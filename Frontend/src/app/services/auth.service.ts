import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token'; // Usamos esta clave en todo el código

  constructor(private http: HttpClient, private router: Router) {}

  getUser(): Observable<User> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${environment.apiUrl}/user`, { headers });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.router.navigate(['/dashboard']); 
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('Usuario o contraseña incorrectos.'));
        }
        return throwError(() => new Error('Error desconocido al iniciar sesión.'));
      })
    );
  }
  

  register(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/register`, { username, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('El nombre de usuario ya está en uso.'));
        }
        return throwError(() => new Error('Error desconocido al registrar.'));
      })
    );
  }
  

  logout() {
    localStorage.removeItem(this.TOKEN_KEY); // Elimina el token correctamente
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
