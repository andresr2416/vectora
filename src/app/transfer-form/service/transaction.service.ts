// src/app/transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, switchMap } from 'rxjs'; 
import { Transaction } from '../model/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000'; 
  
  constructor(private http: HttpClient) {}
  
    getTransactions(): Observable<Transaction[]> {
      return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
    }
  
  updateAccountBalances(
    originAccountId: number,
    destinationAccountId: number,
    amount: number
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/${originAccountId}`).pipe(
      switchMap((originAccount: any) => {
        const updatedOriginAccount = {
          ...originAccount,
          balance: originAccount.balance - amount, 
        };

        return this.http
          .put(
            `${this.apiUrl}/accounts/${originAccountId}`,
            updatedOriginAccount
          )
          .pipe(
            switchMap(() => {
              return this.http
                .get(`${this.apiUrl}/accounts/${destinationAccountId}`)
                .pipe(
                  switchMap((destinationAccount: any) => {
                    const updatedDestinationAccount = {
                      ...destinationAccount,
                      balance: destinationAccount.balance + amount, 
                    };
                    return this.http.put(
                      `${this.apiUrl}/accounts/${destinationAccountId}`,
                      updatedDestinationAccount
                    );
                  })
                );
            })
          );
      })
    );
  }

  createTransaction(
    originAccountId: number,
    destinationAccountId: number,
    amount: number,
    description: string,
    transactionTypeOrigin: string = 'gasto', // Por defecto será 'gasto' para la cuenta de origen
    transactionTypeDestination: string = 'ingreso' // Por defecto será 'ingreso' para la cuenta de destino
    
  ): Observable<any> {
    const transaction = {
      originAccountId,
      destinationAccountId,
      amount,
      description,
      timestamp: new Date().toISOString(),
      transactionType: transactionTypeOrigin !== transactionTypeDestination ? 'gasto' : 'ingreso',
    };

    return this.http.post(`${this.apiUrl}/transactions`, transaction); 
  }

  getAccountMovements(accountId: any): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.apiUrl}/transactions?originAccountId=${accountId}`
    );
  }
}
