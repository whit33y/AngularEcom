import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-categories-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-categories-form.component.html',
  styleUrl: './admin-categories-form.component.css',
})
export class AdminCategoriesFormComponent {
  @Output() emitCategory = new EventEmitter<string>();
  categoryForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
  });
}
