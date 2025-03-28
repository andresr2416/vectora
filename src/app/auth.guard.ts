
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('jwt');

    // Si el token está presente y el usuario intenta acceder al login, redirigimos a cuentas
    if (token && next.url[0].path === 'login') {
      this.router.navigate(['/accounts']);
      return false;
    }

    // Si el token no está presente y el usuario intenta acceder a las cuentas, redirigimos al login
    if (!token && next.url[0].path === 'accounts') {
      this.router.navigate(['/login']);
      return false;
    }

    // Si no hay problemas de acceso, permitimos la navegación
    return true;
  }
}
