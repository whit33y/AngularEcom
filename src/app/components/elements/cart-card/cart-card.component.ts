import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCount } from '../../../services/interfaces/products.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css',
})
export class CartCardComponent {
  @Input() product?: ProductCount;
  @Output() emitId = new EventEmitter();
}
