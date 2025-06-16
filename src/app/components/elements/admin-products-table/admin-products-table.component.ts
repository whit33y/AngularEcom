import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../services/interfaces/products.interface';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-admin-products-table',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './admin-products-table.component.html',
  styleUrl: './admin-products-table.component.css',
})
export class AdminProductsTableComponent {
  @Input() products?: Product[] | null;
  @Output() emitDelete = new EventEmitter();
}
