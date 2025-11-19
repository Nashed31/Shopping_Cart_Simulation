import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../../../styles.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  showHomeImage = false;
  imgUrl = 'assets/myIcon.png';


  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.showHomeImage = this.router.url === '/cart';
    this.cart = this.cartService.getCartItems();
  }

  removeItem(productName: string) {
    this.cartService.removeFromCart(productName);
    this.cart = this.cartService.getCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cart = [];
  }
}
