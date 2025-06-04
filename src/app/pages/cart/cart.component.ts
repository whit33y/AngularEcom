import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import {
  Product,
  ProductCount,
} from '../../services/interfaces/products.interface';
import { CartCardComponent } from '../../components/elements/cart-card/cart-card.component';
import { CartCardSkeletonComponent } from '../../components/elements/cart-card-skeleton/cart-card-skeleton.component';

import { CheckoutComponent } from '../../components/elements/checkout/checkout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartCardComponent, CartCardSkeletonComponent, CheckoutComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductsService);
  private router = inject(Router);

  products: Product[] = [];
  productsCount: ProductCount[] = [];
  count: any;
  productsSum: number = 0;
  loading: boolean = false;
  ngOnInit() {
    const cart = this.cartService.cart();
    for (let i = 0; i < cart.length; i++) {
      this.getProduct(cart[i]);
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (response) => {
        this.products.push(response);
        this.productsSum += response.price;
        const existing = this.productsCount.find((p) => p.id === response.id);

        if (existing) {
          existing.count += 1;
        } else {
          this.productsCount.push({ ...response, count: 1 });
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  goToCheckout() {
    console.log('Checkout!');
  }

  openDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
}
