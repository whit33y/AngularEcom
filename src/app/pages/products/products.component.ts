import { Component, computed, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../services/interfaces/products.interface';
import { ProductCardComponent } from '../../components/elements/product-card/product-card.component';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../components/elements/spinner/spinner.component';
import { BannerComponent } from '../../components/elements/banner/banner.component';
import { CartService } from '../../services/cart.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, SpinnerComponent, BannerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private productsService = inject(ProductsService);
  private popupService = inject(PopupService);
  private cartService = inject(CartService);
  private router = inject(Router);

  products: Product[] | null = [];
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
        console.log(this.products);
      },
      error: (err) => {
        this.error = err;
        this.loadingProducts = false;
        console.error('Error loading products', err);
      },
      complete: () => {
        this.loadingProducts = false;
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
}
