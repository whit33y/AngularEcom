import { inject, Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private http = inject(HttpClient);
  private stripePromise = loadStripe(environment.stripePublishableKey);
  private readonly API =
    'https://eqoubrqeyrknukljugim.supabase.co/functions/v1/stripe-products';

  async getStripe(): Promise<Stripe | null> {
    return await this.stripePromise;
  }

  createProduct(data: {
    name: string;
    description?: string;
    amount: number;
    currency?: string;
    recurring?: { interval: 'month' | 'year'; interval_count?: number };
  }) {
    return this.http.post(this.API, data);
  }
}
