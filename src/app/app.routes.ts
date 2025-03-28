import { Routes } from '@angular/router';
import { AccountsComponent } from './user/accounts/accounts.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    {
      path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],  // Ruta para dashboard protegida
      children: [
        { path: 'accounts', component: AccountsComponent },  // Ruta para accounts dentro del dashboard
        // Puedes agregar más rutas aquí como '/dashboard/users' o '/dashboard/settings'
      ]
    },
  ];