import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-dropdown.component.html',
  styleUrl: './category-dropdown.component.css',
})
export class CategoryDropdownComponent {
  @Input() categories?: string[];
  @Input() showDropdown?: boolean;
  @Input() selectedCategory?: string;
  @Output() emitDropdown = new EventEmitter();
  @Output() emitCategory = new EventEmitter();
}
