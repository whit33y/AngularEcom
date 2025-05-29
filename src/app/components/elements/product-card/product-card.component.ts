import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() name?: string;
  @Input() price?: number;
  @Input() image_url?: string;
  @Input() description?: string;
  @Input() product_id?: number;
  @Output() emitCartId = new EventEmitter();
  @Output() emitDetailsId = new EventEmitter();

  sendCartId(id: number) {
    this.emitCartId.emit(id);
  }

  sendDetailsId(id: number) {
    this.emitDetailsId.emit(id);
  }
}
