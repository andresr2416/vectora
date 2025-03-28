import { Routes } from '@angular/router';
import { AccountsComponent } from './user/accounts/accounts.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] }
  ];