import { Component, Input } from '@angular/core';
import { Product } from '../../../services/interfaces/products.interface';

@Component({
  selector: 'app-admin-products-table',
  standalone: true,
  imports: [],
  templateUrl: './admin-products-table.component.html',
  styleUrl: './admin-products-table.component.css',
})
export class AdminProductsTableComponent {
  @Input() products?: Product[];
}
