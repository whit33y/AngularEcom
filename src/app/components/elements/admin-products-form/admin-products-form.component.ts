import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-products-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-products-form.component.html',
  styleUrl: './admin-products-form.component.css',
})
export class AdminProductsFormComponent {
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl<File | null>(null, [Validators.required]),
  });

  @Output() emitForm = new EventEmitter<any>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value || '');
    formData.append(
      'description',
      this.productForm.get('description')?.value || ''
    );
    formData.append(
      'price',
      this.productForm.get('price')?.value?.toString() || '0'
    );
    formData.append('category', this.productForm.get('category')?.value || '');

    const image = this.productForm.get('image')?.value;
    if (image instanceof File) {
      formData.append('image', image);
    } else {
      console.warn('');
    }

    this.emitForm.emit(formData);
  }
}
