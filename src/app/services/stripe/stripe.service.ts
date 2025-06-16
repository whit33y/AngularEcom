import { inject, Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
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
    const transformedData = {
      ...data,
      amount: Math.round(data.amount * 100),
      currency: data.currency || 'usd',
      type: 'good',
    };

    return this.http.post(this.API, transformedData);
  }

  getProducts(): Observable<any> {
    return this.http.get(this.API);
  }

  deleteProduct(productId: string) {
    const token = this.authService.session()?.access_token ?? null;
    if (!token) {
      throw new Error('Nie jesteś zalogowany');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(this.API_DELETE_PRODUCT, { productId }, { headers });
  }
}
