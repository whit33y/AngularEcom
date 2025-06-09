import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../services/interfaces/products.interface';
import { ProductCardComponent } from '../../components/elements/product-card/product-card.component';
import { Router } from '@angular/router';
import { BannerComponent } from '../../components/elements/banner/banner.component';
import { CartService } from '../../services/cart.service';
import { PopupService } from '../../services/popup.service';
import { ProductCardSkeletonComponent } from '../../components/elements/product-card-skeleton/product-card-skeleton.component';
import { PaginationComponent } from '../../components/elements/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { CategoryDropdownComponent } from '../../components/elements/category-dropdown/category-dropdown.component';
import { SortDropdownComponent } from '../../components/elements/sort-dropdown/sort-dropdown.component';
import { StripeService } from '../../services/stripe/stripe.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCardComponent,
    BannerComponent,
    ProductCardSkeletonComponent,
    PaginationComponent,
    CommonModule,
    CategoryDropdownComponent,
    SortDropdownComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private productsService = inject(ProductsService);
  private popupService = inject(PopupService);
  private cartService = inject(CartService);
  private router = inject(Router);
  // private stripe = inject(StripeService);

  skeletonArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  products: Product[] | null = [];
  categories: string[] = [];
  error: string = '';
  loadingProducts: boolean = false;

  constructor() {}

  ngOnInit() {
    this.getProducts();
  }

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
        this.changeSort(this.selectedSort);
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

  getProductsByCategory(category: string) {
    this.loadingProducts = true;
    this.productsService.getProductsByCategory(category).subscribe({
      next: (data) => {
        this.products = data;
        if (data.length < 1) {
          this.error = 'No products found.';
        }
        this.maxPages = Math.ceil(data.length / this.limit);
        this.currentPage = 1;
        this.updateShownProducts();
        this.changeSort(this.selectedSort);
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

  addToCart(id: number) {
    this.popupService.openPopup('SUCCESS', 'Added product to cart');
    this.cartService.addToCart(id);
  }

  openDetails(id: number) {
    this.router.navigate(['/products', id]);
  }

  maxPages: number = 0;
  currentPage: number = 1;
  limit: number = 9;
  showProducts: Product[] | null = [];
  @ViewChild('product') productsRef!: ElementRef;
  changePage(action: string) {
    if (action === 'prev' && this.currentPage > 1) {
      this.currentPage--;
      this.updateShownProducts();
    } else if (action === 'next' && this.currentPage < this.maxPages) {
      this.currentPage++;
      this.updateShownProducts();
    }
    setTimeout(() => {
      this.productsRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
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

  showDropdown = false;
  selectedCategory = 'all';
  changeCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.getProducts();
    } else {
      this.getProductsByCategory(category);
    }
  }

  showSort = false;
  selectedSort = 'newtoold';
  changeSort(sort: string) {
    switch (sort) {
      case 'lowtohigh':
        this.products!.sort((a, b) => a.price - b.price);
        break;
      case 'hightolow':
        this.products!.sort((a, b) => b.price - a.price);
        break;
      case 'newtoold':
        this.products!.sort((a, b) => b.id - a.id);
        break;
      case 'oldtonew':
        this.products!.sort((a, b) => a.id - b.id);
        break;
    }
    this.currentPage = 1;
    this.updateShownProducts();
  }

  // addToStripe() {
  //   this.stripe
  //     .createProduct({
  //       name: 'product',
  //       description: 'xd',
  //       amount: 20000,
  //       currency: 'USD',
  //     })
  //     .subscribe({
  //       next: (response) => {
  //         console.log(response);
  //       },
  //       error: (error) => {
  //         console.error(error);
  //       },
  //     });
  // }
}
