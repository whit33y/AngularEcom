import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../services/interfaces/category.interface';
@Component({
  selector: 'app-admin-categories-table',
  standalone: true,
  imports: [],
  templateUrl: './admin-categories-table.component.html',
  styleUrl: './admin-categories-table.component.css',
})
export class AdminCategoriesTableComponent {
  @Input() categoryList?: Category[];
  @Output() emitCategory = new EventEmitter();
}
