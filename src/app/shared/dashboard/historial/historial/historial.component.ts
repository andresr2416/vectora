import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../../transfer-form/service/transaction.service';
import { Transaction } from '../../../../transfer-form/model/transaction.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  imports: [CommonModule, MaterialModule],
})
export class HistorialComponent implements OnInit {
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['originAccountId', 'destinationAccountId', 'amount', 'timestamp', 'transactionType'];
  
  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
    });
  }
}