import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  constructor() {
    this.updateCartCount();
  }

  private getCartKey(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return `cart_${user.email}`;
  }

  private getCart(): any[] {
    return JSON.parse(localStorage.getItem(this.getCartKey()) || '[]');
  }

  private saveCart(cart: any[]) {
    localStorage.setItem(this.getCartKey(), JSON.stringify(cart));
    this.updateCartCount();
  }

  updateCartCount() {
    const cart = this.getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartItemCount.next(count);
  }

  addToCart(product: any) {
    const cart = this.getCart();
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.saveCart(cart);
  }

  removeFromCart(productName: string) {
    const cart = this.getCart();
    const index = cart.findIndex(item => item.name === productName);
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      this.saveCart(cart);
    }
  }

  clearCart() {
    localStorage.removeItem(this.getCartKey());
    this.cartItemCount.next(0);
  }

  getCartItems(): any[] {
    return this.getCart();
  }
}
