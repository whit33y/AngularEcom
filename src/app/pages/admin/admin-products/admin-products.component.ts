import { Component, inject, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../services/interfaces/products.interface';
import { StripeService } from '../../../services/stripe/stripe.service';
import { CommonModule } from '@angular/common';
import { AdminProductsFormComponent } from '../../../components/elements/admin-products-form/admin-products-form.component';
import { AdminProductsTableComponent } from '../../../components/elements/admin-products-table/admin-products-table.component';
import { PaginationComponent } from '../../../components/elements/pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    CommonModule,
    AdminProductsFormComponent,
    AdminProductsTableComponent,
    PaginationComponent,
  ],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css',
})
export class AdminProductsComponent {
  private productsService = inject(ProductsService);
  private stripeService = inject(StripeService);
  private router = inject(Router);
  constructor() {
    this.getProducts();
  }

  showForm = false;
  selectedOption = 'list';

  loadingProducts = false;
  products: Product[] = [];
  categories: string[] = [];

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

  error = '';
  getProducts() {
    this.loadingProducts = true;
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        if (data.length < 1) {
          this.error = 'No products found.';
        }
        this.maxPages = Math.ceil(data.length / this.limit);
        this.currentPage = 1;
        this.updateShownProducts();
      },
      error: (err) => {
        this.error = err;
        this.loadingProducts = false;
        console.error('Error loading products', err);
      },
      complete: () => {
        this.loadingProducts = false;
        this.products?.forEach((value) => {
          if (!this.categories.includes(value.category)) {
            this.categories.push(value.category);
          }
        });
      },
    });
  }

  maxPages: number = 0;
  currentPage: number = 1;
  limit: number = 12;
  showProducts: Product[] | null = [];
  changePage(action: string) {
    if (action === 'prev' && this.currentPage > 1) {
      this.currentPage--;
      this.updateShownProducts();
    } else if (action === 'next' && this.currentPage < this.maxPages) {
      this.currentPage++;
      this.updateShownProducts();
    }
  }

  startIndex: number = 0;
  endIndex: number = 0;
  updateShownProducts() {
    if (!this.products) return;
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    if (endIndex >= this.products.length) {
      this.endIndex = this.products.length;
    } else {
      this.endIndex = endIndex;
    }
    this.startIndex = startIndex + 1;
    this.showProducts = this.products.slice(startIndex, endIndex);
  }
}
