import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MaterialModule } from '../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountDialogComponent } from './create-account-dialog/create-account-dialog.component';
import { AccountDetailsDialogComponent } from './account-details-dialog/account-details-dialog.component';
import { Account } from './accounts.model';

@Component({
  selector: 'app-accounts',
  imports: [MaterialModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  accounts: Account[] = [];
  displayedColumns: string[] = ['accountNumber', 'type', 'balance', 'actions'];

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.authService.getAccounts().subscribe(
      (data) => {
        this.accounts = data;
      },
      (error) => {
        console.error('Error loading accounts:', error);
      }
    );
  }

  openCreateAccountDialog() {
    const dialogRef = this.dialog.open(CreateAccountDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAccounts();
      }
    });
  }

  openAccountDetailsDialog(account: any) {
    this.dialog.open(AccountDetailsDialogComponent, {
      data: account,
    });
  }
}
