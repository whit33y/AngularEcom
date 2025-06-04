import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SupabaseService } from './supabase/supabase.service';
import { Product } from './interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private supabase: SupabaseService) {}

  getProducts(): Observable<Product[]> {
    return from(
      this.supabase.client
        .from('products')
        .select('*')
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return from(
      this.supabase.client
        .from('products')
        .select('*')
        .eq('category', category)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })
    );
  }

  getProduct(id: number): Observable<Product> {
    return from(
      this.supabase.client
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })
    );
  }
}
