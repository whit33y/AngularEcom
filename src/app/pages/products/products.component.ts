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
        console.log(this.categories);
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
        console.log(this.categories);
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
  showSort = false;
  selectedCategory = 'all';
  changeCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.getProducts();
    } else {
      this.getProductsByCategory(category);
    }
  }

  changeSort(sort: string) {
    console.log(sort);
  }
}
