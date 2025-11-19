import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { SignComponent } from './components/sign/sign.component';
import {AuthService} from './services/auth.service';
import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'products', title: 'Products Page',component: ProductsComponent, canActivate: [AuthService] },
  { path: 'cart', title: 'Cart Page',component: CartComponent, canActivate: [AuthService] },
  { path: 'sign', title: 'Sign Page',component: SignComponent },
];
