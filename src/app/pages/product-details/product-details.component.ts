import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../services/interfaces/products.interface';
import { ProductDetailsCardComponent } from '../../components/elements/product-details-card/product-details-card.component';
import { CartService } from '../../services/cart.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ProductDetailsCardComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private productService = inject(ProductsService);
  private popupService = inject(PopupService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.getProduct(Number(idParam));
  }

  product?: Product;
  loading: boolean = false;
  getProduct(id: number) {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  addToCart(id: number) {
    this.popupService.openPopup('SUCCESS', 'Added product to cart');
    this.cartService.addToCart(id);
  }
}
