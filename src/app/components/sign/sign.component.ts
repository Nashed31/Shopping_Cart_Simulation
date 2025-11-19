import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  imports: [FormsModule, MatFormField, MatLabel, MatInput],
  styleUrls: ['../../../styles.css']
})
export class SignComponent implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  isLogin = true;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/products']);
      return;
    }
  }

  async onSubmit() {
    this.error = '';
    this.loading = true;

    await new Promise(resolve => setTimeout(resolve, 5000));

    this.isLogin ? this.login() : this.register();
    this.loading = false;
  }

  login() {
    if (this.email.length === 0 || this.password.length === 0) {
      this.error = 'Enter email and password!';
      return;
    }
    if (!this.authService.login(this.email, this.password)) {
      this.error = 'Wrong email or password!';
    } else {
      localStorage.setItem('user', JSON.stringify({ email: this.email }));
      this.router.navigate(['/products']);
    }
  }

  register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = 'Invalid email address';
      return;
    }
    const pattern = /^(?=.*[A-Z]).{6,}$/;
    if (!pattern.test(this.password)) {
      this.error = '-Password must be at least 6 characters and contain at least one uppercase letter.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match!';
      return;
    }
    if (!this.authService.register(this.email, this.password)) {
      this.error = 'User already exists!';
    } else {
      this.toggleForm();
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.error = '';
  }
}
