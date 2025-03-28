import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() goToAccounts = new EventEmitter<void>();
  
  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
