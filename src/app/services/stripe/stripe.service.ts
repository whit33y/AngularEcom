import { inject, Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private http = inject(HttpClient);
  private stripePromise = loadStripe(environment.stripePublishableKey);
  private readonly API =
    'https://eqoubrqeyrknukljugim.supabase.co/functions/v1/stripe-products';
  private readonly API_DELETE_PRODUCT =
    'https://eqoubrqeyrknukljugim.supabase.co/functions/v1/stripe-delete-product';

  async getStripe(): Promise<Stripe | null> {
    return await this.stripePromise;
  }

  createProduct(data: {
    name: string;
    description?: string;
    amount: number;
    currency?: string;
    recurring?: { interval: 'month' | 'year'; interval_count?: number };
  }): Observable<any> {
    return this.http.post(this.API, data);
  }

  deleteProduct(productId: string) {
    return this.http.post(this.API_DELETE_PRODUCT, { productId });
  }
}
