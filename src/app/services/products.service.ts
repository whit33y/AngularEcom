import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from './supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private supabase: SupabaseService) {}

  getProducts(): Observable<any[]> {
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
}
