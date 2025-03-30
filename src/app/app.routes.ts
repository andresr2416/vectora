import { Routes } from '@angular/router';
import { AccountsComponent } from './user/accounts/accounts.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { HistorialComponent } from './shared/dashboard/historial/historial/historial.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    {
      path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],  
      children: [
        { path: 'accounts', component: AccountsComponent },  
        { path: 'history', component: HistorialComponent }, 
      ],
    },
  ];