import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../services/interfaces/products.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details-card.component.html',
  styleUrl: './product-details-card.component.css',
})
export class ProductDetailsCardComponent {
  @Input() product?: Product;
  @Output() emitId = new EventEmitter<number>();
}
