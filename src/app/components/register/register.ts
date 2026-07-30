import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  nombre = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register({
      nombre: this.nombre,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.success = 'Cuenta creada. Podés iniciar sesión.';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.error = 'Error al registrar. El email ya puede estar en uso.';
      }
    });
  }
}
