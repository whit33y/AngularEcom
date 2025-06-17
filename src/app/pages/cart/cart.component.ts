import { Component, computed, inject } from '@angular/core';
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
import { PaymentService } from '../../services/stripe/payment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartCardComponent, CartCardSkeletonComponent, CheckoutComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private cartService = inject(CartService);
  private paymentService = inject(PaymentService);
  private productService = inject(ProductsService);
  private router = inject(Router);
  private authService = inject(AuthService);

  products: Product[] = [];
  productsCount: ProductCount[] = [];
  productsSum: number = 0;
  loading: boolean = false;
  isLoggedIn = computed(() => this.authService.sessionStatus());
  ngOnInit() {
    const cart = this.cartService.cart();
    for (let i = 0; i < cart.length; i++) {
      this.getProduct(cart[i]);
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.products.push(data);
        this.productsSum += data.price;
        const existing = this.productsCount.find((p) => p.id === data.id);

        if (existing) {
          existing.count += 1;
        } else {
          this.productsCount.push({ ...data, count: 1 });
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
    const items = this.productsCount.map((product) => ({
      priceId: product.price_id,
      quantity: product.count,
    }));

    items.push({ priceId: 'price_1RWxj6JxVIR4Q0T4eeBAXNlA', quantity: 1 });

    this.paymentService
      .checkout(items)
      .then((data) => {
        if (data.url) {
          this.deleteCart();
          window.location.href = data.url;
        } else {
          console.error('No checkout URL in response');
        }
      })
      .catch((err) => {
        console.error('Checkout error:', err);
      });
  }

  openDetails(id: number) {
    this.router.navigate(['/products', id]);
  }

  deleteCart() {
    this.cartService.deleteCart();
    window.location.reload();
  }
}
