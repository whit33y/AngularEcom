import { Component, inject, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../services/interfaces/products.interface';
import { StripeService } from '../../../services/stripe/stripe.service';
import { CommonModule } from '@angular/common';
import { AdminProductsFormComponent } from '../../../components/elements/admin-products-form/admin-products-form.component';
import { AdminProductsTableComponent } from '../../../components/elements/admin-products-table/admin-products-table.component';
import { PaginationComponent } from '../../../components/elements/pagination/pagination.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../../services/popup.service';
import { Category, CategoryService } from '../../../services/category.service';

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
  private categoryService = inject(CategoryService);
  private stripeService = inject(StripeService);
  private popupService = inject(PopupService);
  constructor() {
    this.getProducts();
  }

  showForm = false;
  selectedOption = 'list';

  loadingProducts = false;
  products: Product[] = [];
  categories: Category[] = [];

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
        complete: () => {
          this.getProducts();
          this.selectedOption = 'list';
          this.popupService.openPopup(
            'SUCCESS',
            'Successfully added new product.'
          );
          this.productForm.reset();
        },
      });
  }

  priceId: any = '';
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
          this.priceId = data.price.id;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.addProduct(
            this.productForm.value.name!,
            this.productForm.value.description!,
            this.productForm.value.price!,
            this.imageLink,
            this.productForm.value.category!,
            this.priceId!
          );
        },
      });
  }

  imageLink: string = '';
  addImage(file: File) {
    this.productsService.addImage(file).subscribe({
      next: (data) => {
        this.imageLink = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.addToStripe(
          this.productForm.value.name!,
          this.productForm.value.description!,
          this.productForm.value.price!
        );
      },
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
        this.getCategories();
      },
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
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

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    price: new FormControl(1, [Validators.required, Validators.min(1)]),
    category: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null, Validators.required),
  });

  onFileSelected(file: File) {
    this.productForm.patchValue({ image: file });
    this.productForm.get('image')?.updateValueAndValidity();
  }

  onSubmit(event: FormGroup) {
    this.productForm.setValue({
      name: event.value.name || '',
      description: event.value.description || '',
      price: event.value.price || 0,
      category: event.value.category || '',
      image: event.value.image || '',
    });

    if (this.productForm.valid) {
      this.addImage(this.productForm.value.image!);
    }
  }
}
