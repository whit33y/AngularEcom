import { Component, Input } from '@angular/core';
import { ProductCount } from '../../../services/interfaces/products.interface';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css',
})
export class CartCardComponent {
  @Input() product?: ProductCount;
}
