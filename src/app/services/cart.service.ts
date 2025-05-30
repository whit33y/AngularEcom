import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<number[]>([]);
  cartCount = computed(() => this.cart().length);

  constructor() {
    if (localStorage.getItem('cart')) {
      this.cart.set(JSON.parse(localStorage.getItem('cart')!));
    }
  }

  addToCart(id: number) {
    this.cart.update((elements) => [...elements, id]);
    localStorage.setItem('cart', JSON.stringify(this.cart()));
  }

  deleteCart() {
    this.cart.update(() => []);
    localStorage.removeItem('cart');
  }
}
