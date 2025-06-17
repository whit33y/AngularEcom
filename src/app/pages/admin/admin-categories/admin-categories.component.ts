import { Component, inject } from '@angular/core';
import { AdminCategoriesFormComponent } from '../../../components/elements/admin-categories-form/admin-categories-form.component';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../services/interfaces/category.interface';
import { SpinnerComponent } from '../../../components/elements/spinner/spinner.component';
import { AdminCategoriesTableComponent } from '../../../components/elements/admin-categories-table/admin-categories-table.component';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [
    AdminCategoriesFormComponent,
    SpinnerComponent,
    AdminCategoriesTableComponent,
  ],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css',
})
export class AdminCategoriesComponent {
  private categoryService = inject(CategoryService);
  private popupService = inject(PopupService);

  constructor() {
    this.getCategories();
  }

  addCategory(category: string) {
    this.categoryService.addCategory(category).subscribe({
      next: (data) => {},
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.getCategories();
        this.popupService.openPopup('SUCCESS', 'Added new category');
      },
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCateogry(id).subscribe({
      next: (data) => {},
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.getCategories();
        this.popupService.openPopup('SUCCESS', 'Deleted category');
      },
    });
  }

  loadingCategories: boolean = false;
  categories: Category[] = [];
  getCategories() {
    this.loadingCategories = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loadingCategories = false;
      },
    });
  }
}
