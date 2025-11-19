import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService implements CanActivate {

  private users: any[] = JSON.parse(localStorage.getItem('users') || '[]');
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());

  authStatus$ = this.authStatus.asObservable();

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/sign']);
      return false;
    }
    return true;
  }

  register(email: string, password: string): boolean {
    if (this.isAuthenticated()) {
      return false;
    }
    if (this.users.find((user) => user.email === email)) {
      return false;
    }
    this.users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.authStatus.next(true);
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    this.authStatus.next(false);
  }
}
