import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private functionUrl =
    'https://eqoubrqeyrknukljugim.supabase.co/functions/v1/create-checkout-session';

  constructor(private http: HttpClient) {}

  createCheckoutSession(priceId: string) {
    return this.http.post<{ url: string }>(this.functionUrl, { priceId });
  }

  checkout(items: { priceId: string; quantity: number }[]) {
    return fetch(
      'https://eqoubrqeyrknukljugim.supabase.co/functions/v1/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error('Failed to create checkout session');
      return res.json();
    });
  }
}
