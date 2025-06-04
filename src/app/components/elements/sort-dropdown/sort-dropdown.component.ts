import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-dropdown.component.html',
  styleUrl: './sort-dropdown.component.css',
})
export class SortDropdownComponent {
  @Input() showSort?: boolean;
  @Output() emitDropdown = new EventEmitter();
  @Output() emitSort = new EventEmitter();
}
