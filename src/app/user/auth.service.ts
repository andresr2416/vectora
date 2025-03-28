import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL de JSON Server

  constructor(private http: HttpClient) {}

  // Método para autenticar al usuario
  authenticate(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            return { token: 'mocked-token' }; 
          } else {
            return { token: null };
          }
        })
      );
  }
  // Verificar si el usuario está autenticado (basado en el token)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }

  // Obtener las cuentas bancarias del usuario
  getAccounts(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/accounts?userId=${userId}`);
  }
}
