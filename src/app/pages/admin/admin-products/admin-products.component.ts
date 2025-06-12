import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../services/interfaces/products.interface';
import { StripeService } from '../../../services/stripe/stripe.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css',
})
export class AdminProductsComponent {
  private productsService = inject(ProductsService);
  private stripeService = inject(StripeService);
  constructor() {
    this.loadProducts();
  }

  loadingProducts = false;
  products: Product[] = [];
  loadProducts() {
    this.loadingProducts = true;
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loadingProducts = false;
      },
    });
  }

  addProduct(
    name: string,
    description: string,
    price: number,
    image_urls: string,
    category: string,
    price_id: string
  ) {
    this.productsService
      .addProduct(name, description, price, image_urls, category, price_id)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {},
      });
  }

  addToStripe(name: string, description: string, amount: number) {
    this.stripeService
      .createProduct({
        name,
        description,
        amount,
        currency: 'USD',
      })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {},
      });
  }

  addImage(file: File) {
    this.productsService.addImage(file).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }
}
