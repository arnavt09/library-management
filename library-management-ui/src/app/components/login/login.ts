import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  message = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  loginUser(): void {
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.login(user).subscribe({
      next: (response: any) => {
        this.authService.saveUser(response.user);
        this.message = 'Login successful';
        this.router.navigate(['/books']);
      },
      error: (error: any) => {
        this.message = error.error?.message || 'Login failed';
      }
    });
  }
}