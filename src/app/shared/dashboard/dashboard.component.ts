import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../user/services/auth.service';
import { Account } from '../../user/accounts/accounts.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { TransferFormComponent } from '../../transfer-form/transfer-form.component';
import { TransactionService } from '../../transfer-form/service/transaction.service';
import { Transaction } from '../../transfer-form/model/transaction.model';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
register();

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, CommonModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  accounts: Account[] = [];
  showAccountsCards = true;
  private routerSubscription!: Subscription;
  drawerOpened = true;
  showMovements = false;
  accountMovements: Transaction[] = [];
  isLoading = false;
  selectedAccount: number | null = null;

  displayedColumns: string[] = [
    'originAccountId',
    'destinationAccountId',
    'amount',
    'timestamp',
    'transactionType'
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.loadAccounts();

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        event.urlAfterRedirects === '/dashboard'
      ) {
        this.loadAccounts();
      }
    });
  }

  loadAccounts() {
    this.showAccountsCards = true;
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getAccounts().subscribe((accounts) => {
        this.accounts = accounts.filter(
          (account) => account.userId === Number(userId)
        );
      });
    }
  }

  openTransferDialog(account: Account) {
    const dialogRef = this.dialog.open(TransferFormComponent, {
      width: '400px',
      data: account,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAccounts();
      this.showMovements = false;
    });
  }

  showAccountMovements(account: any) {
    this.transactionService
      .getAccountMovements(account.accountNumber)
      .subscribe((movements) => {
        this.accountMovements = movements;
        this.showMovements = true;
        this.isLoading = false;
      });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToAccounts() {
    this.showAccountsCards = false;
    this.router.navigate(['/dashboard/accounts']);
  }
  goToHistory() {
    this.showAccountsCards = false;
    this.router.navigate(['/dashboard/history']);
  }
}
