import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() startIndex?: number;
  @Input() endIndex?: number;
  @Input() currentPage?: number;
  @Input() maxPage?: number;
  @Input() elementsCount?: number;
  @Output() changePage = new EventEmitter<string>();
}
