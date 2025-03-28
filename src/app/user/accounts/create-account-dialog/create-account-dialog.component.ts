import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-create-account-dialog',
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.scss',
})
export class CreateAccountDialogComponent {
  accountForm: FormGroup;
  accounts!: any[];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.accountForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.authService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  generateAccountNumber(accountType: string): string {
    const randomNum = Math.floor(Math.random() * 100000000);
    return `${randomNum}`;
  }

  onAccountTypeChange() {
    const accountType = this.accountForm.get('accountType')?.value;
    if (accountType) {
      const accountNumber = this.generateAccountNumber(accountType);
      this.accountForm.patchValue({ accountNumber });
    }
  }

  onSubmit() {

    
    if (this.accountForm.invalid) {
      return;
    }

    const { accountNumber, accountType } = this.accountForm.value;

    const existingAccount = this.accounts.find(
      (account) => account.accountNumber === accountNumber
    );

    if (existingAccount) {
      Swal.fire('Error', 'El número de cuenta ya existe', 'error');
      return;
    }

    const newAccount = { ...this.accountForm.value, balance: 0 };

    this.authService.createAccount(newAccount).subscribe(
      (response) => {
        Swal.fire('Éxito', 'La cuenta fue creada correctamente', 'success');
        this.dialogRef.close(true); 
      },
      (error) => {
        Swal.fire('Error', 'Hubo un problema al crear la cuenta', 'error');
      }
    );
  }

  close() {
    this.accountForm.reset();
    this.dialogRef.close();
  }
}
