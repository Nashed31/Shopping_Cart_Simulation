import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { CartService } from '../../services/cart.service';
import {filter} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../../../styles.css'],
  standalone: true
})

export class ProductsComponent implements OnInit {
  products = [
    { name: "Product-0", price: 1200, image: "myIcon.png" },
    { name: "Product-1", price: 1200, image: "myIcon.png" },
    { name: "Product-2", price: 1200, image: "myIcon.png" },
    { name: "Product-3", price: 1200, image: "myIcon.png" },
    { name: "Product-4", price: 1200, image: "myIcon.png" },
    { name: "Product-5", price: 1200, image: "myIcon.png" },
    { name: "Product-6", price: 1200, image: "myIcon.png" },
    { name: "Product-7", price: 1200, image: "myIcon.png" },
    { name: "Product-8", price: 1200, image: "myIcon.png" },
    { name: "Product-9", price: 1200, image: "myIcon.png" }
  ];

  showHomeImage = false;
  imgUrl = 'assets/myIcon.png';

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.showHomeImage = this.router.url === '/products';

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHomeImage = event.urlAfterRedirects === '/products';
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
