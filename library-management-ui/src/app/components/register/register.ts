import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name = '';
  email = '';
  password = '';
  role = '';
  message = '';

  constructor(private authService: Auth) {}

  registerUser(): void {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.message = 'User registered successfully';
      },
      error: (error) => {
        this.message = error.error.message || 'Registration failed';
      }
    });
  }
}