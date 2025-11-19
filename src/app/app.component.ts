import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {CartService} from './services/cart.service';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['../styles.css'],
})

export class AppComponent implements OnInit {
  showHomeImage = false;
  isAuthenticated = false;
  userName = '';
  cartItemCount = 0;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.email) {
      this.userName = user.email.split('@')[0];
    }

    this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
      const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = updatedUser?.email ? updatedUser.email.split('@')[0] : '';
      this.cartService.updateCartCount();
    });

    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showHomeImage = event.urlAfterRedirects === '/';
    });
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.cartItemCount = 0;
    this.router.navigate(['/sign']).then(r => r);
  }

  login() {
    this.router.navigate(['/sign']).then(r => r);
  }
}
