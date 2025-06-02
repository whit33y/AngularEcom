import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../services/interfaces/products.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductsService);

  products: Product[] = [];
  productsSum: number = 0;
  loading: boolean = false;
  ngOnInit() {
    const cart = this.cartService.cart();
    for (let i = 0; i < cart.length; i++) {
      this.getProduct(cart[i]);
    }
    console.log(this.products);
  }

  getProduct(id: number) {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (response) => {
        this.products.push(response);
        this.productsSum += response.price;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
