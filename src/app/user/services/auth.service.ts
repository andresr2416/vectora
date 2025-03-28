import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Account } from '../accounts/accounts.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/users?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            const token = users[0].token;
            const userId = users[0].id;
            localStorage.setItem('jwt', token);
            localStorage.setItem('userId', userId);
            return { token, userId };
          } else {
            return { token: null };
          }
        })
      );
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getAccounts(): Observable<Account[]> {
    const userId = this.getUserId();

    if (!userId) {
      throw new Error('No authenticated user found');
    }

    return this.http.get<Account[]>(`${this.apiUrl}/accounts?userId=${userId}`);
  }

  createAccount(newAccount: Account): Observable<Account> {
    const userId = this.getUserId();

    if (!userId) {
      throw new Error('No authenticated user found');
    }
    newAccount.userId = Number(userId);

    return this.http.post<Account>(`${this.apiUrl}/accounts`, newAccount);
  }
}
