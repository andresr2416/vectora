import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../user/services/auth.service';
import { Account } from '../user/accounts/accounts.model';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';
import { TransactionService } from './service/transaction.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class TransferFormComponent implements OnInit {
  transferForm!: FormGroup;
  accounts: Account[] = [];
  originAccount: Account | null = null;
  accountDestination: Account[] = [];
  accountOrigin: Account[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private transactionService: TransactionService,
    private dialogRef: MatDialogRef<TransferFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.originAccount = this.data; 
      this.initForm(); 
    } else {
      console.error('La cuenta no fue pasada correctamente');
    }

    this.loadAccounts();
  }

  loadAccounts() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getAccounts().subscribe((accounts) => {
        this.accounts = accounts.filter(
          (account) => account.userId === Number(userId)
        );
        this.accountOrigin = this.accounts.filter(
          (account) => account.id === this.originAccount?.id
        );
        this.accountDestination = this.accounts.filter(
          (account) => account.id !== this.originAccount?.id
        );
      });
    }
  }

  initForm() {
    this.transferForm = this.fb.group({
      originAccount: [this.originAccount?.id, Validators.required], 
      destinationAccount: ['', Validators.required], 
      amount: ['', [Validators.required, Validators.min(1)]], 
      description: ['', Validators.required], 
    });
  }

  onSubmit() {
    if (this.transferForm.invalid) {
      Swal.fire(
        'Error',
        'Por favor, complete todos los campos correctamente',
        'error'
      );
      return;
    }

    const { originAccount, destinationAccount, amount, description } =
      this.transferForm.value;

    const parsedAmount = parseFloat(amount); 
    const originAccountData = this.accountOrigin.find(account => account.id === originAccount);
  const destinationAccountData = this.accountDestination.find(account => account.id === destinationAccount);

  

    if (!originAccountData) {
      Swal.fire('Error', 'No se encontró la cuenta de origen', 'error');
      return;
    }


    if (parsedAmount > originAccountData.balance) {
      Swal.fire(
        'Error',
        'El monto no puede ser mayor al saldo disponible',
        'error'
      );
      return;
    }

    this.transactionService
      .createTransaction(
        Number(originAccountData.accountNumber),
        Number(destinationAccountData?.accountNumber),
        parsedAmount,
        description
      )
      .subscribe(() => {
        this.transactionService
          .updateAccountBalances(
            originAccount,
            destinationAccount,
            parsedAmount
          )
          .subscribe(() => {
            Swal.fire({
              title: '¿Confirmar transferencia?',
              text: `Cuenta origen: ${originAccountData.accountNumber} 
                     \nCuenta destino: ${destinationAccount?.accountNumber}
                     \nMonto: $${parsedAmount} 
                     \nDescripción: ${description}`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar',
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Transferencia Realizada',
                  'La transferencia ha sido realizada exitosamente',
                  'success'
                );
                this.loadAccounts();
                this.dialogRef.close();
              }
            });
          });
      });
  }
}
