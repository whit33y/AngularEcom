import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private functionUrl = 'https://eqoubrqeyrknukljugim.supabase.co/functions/v1/create-checkout-session';

  constructor(private http: HttpClient) {}

  createCheckoutSession(priceId: string) {
    return this.http.post<{ url: string }>(this.functionUrl, { priceId });
  }
}
 
// constructor(private paymentService: PaymentService) {}

// startPayment() {
//   const priceId = 'price_...'; // Podaj właściwe priceId
//   this.paymentService.createCheckoutSession(priceId).subscribe({
//     next: (res) => {
//       if(res.url) {
//         window.location.href = res.url; // przekierowanie do Stripe Checkout
//       } else {
//         console.error('Brak URL do płatności w odpowiedzi');
//       }
//     },
//     error: (err) => console.error('Błąd podczas tworzenia sesji:', err)
//   });
// }