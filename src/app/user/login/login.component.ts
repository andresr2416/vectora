import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MaterialModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.authenticate(email, password).subscribe(response => {
        if (response && response.token) {
          localStorage.setItem('jwt', response.token);  // Guardamos el token en el localStorage
          this.router.navigate(['/dashboard']);  // Redirigimos a la página de cuentas
        } else {
          this.loginError = 'Credenciales incorrectas. Intenta nuevamente.';
        }
      }, (error) => {
        this.loginError = 'Error en el servidor. Intenta más tarde.';
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}