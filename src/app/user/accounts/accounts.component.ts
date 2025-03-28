import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-accounts',
  imports: [MaterialModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {
  accounts = [];
  displayedColumns: string[] = ['accountNumber', 'type', 'balance'];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userId = 1; // Asumimos que el usuario autenticado tiene ID 1
    this.authService.getAccounts(userId).subscribe(data => {
      this.accounts = data;
    });
  }
}
