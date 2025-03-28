import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../../user/services/auth.service';
import { Account } from '../../user/accounts/accounts.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  accounts: Account[] = [];  
  showAccountsCards = true; 
  private routerSubscription!: Subscription; 
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadAccounts();

      this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/dashboard') {
        this.loadAccounts(); 
      }
    });
  }
  loadAccounts() {
    this.showAccountsCards = true;
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getAccounts().subscribe((accounts) => {
       
        this.accounts = accounts.filter((account) => account.userId === Number(userId));
      });
    }
  }
  goToAccounts() {
    this.showAccountsCards = false;  // Ocultamos las cards
    this.router.navigate(['/dashboard/accounts']);  // Redirigimos a la ruta de accounts
  }
}
