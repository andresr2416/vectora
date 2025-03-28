import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-account-details-dialog',
  imports: [MaterialModule],
  templateUrl: './account-details-dialog.component.html',
  styleUrl: './account-details-dialog.component.scss'
})
export class AccountDetailsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AccountDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public account: any
  ) {}

  close() {
    this.dialogRef.close();
  }
}
