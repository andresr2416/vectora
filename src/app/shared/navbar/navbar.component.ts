
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../user/services/auth.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, MaterialModule]
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}


  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleTheme() {
    const body = document.body;

    body.classList.toggle('dark-mode');
    
    const button = document.querySelector('button');
    if (body.classList.contains('dark-mode')) {
      if (button) {
        button.textContent = 'Cambiar a Modo Claro';
      }
    } else {
      if (button) {
        button.textContent = 'Cambiar a Modo Oscuro';
      }
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    
    this.router.navigate(['/login']);
  }
}
