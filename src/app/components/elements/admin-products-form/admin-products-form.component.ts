import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() form!: FormGroup;
  @Input() categories?: string[];
  @Output() formSubmit = new EventEmitter<FormGroup>();
  @Output() fileSelected = new EventEmitter<File>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileSelected.emit(input.files[0]);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit();
    }
  }
}
