import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../services/interfaces/products.interface';
import { ProductCardComponent } from '../../components/elements/product-card/product-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private productsService = inject(ProductsService);
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
    let cart;
    let newCart = [];
    if (localStorage.getItem('cart')) {
      cart = localStorage.getItem('cart');
      cart = JSON.parse(cart!);
      cart.push(id);
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log(localStorage.getItem('cart'));
    } else {
      newCart.push(id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log(localStorage.getItem('cart'));
    }
  }

  openDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
}
