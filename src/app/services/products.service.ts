import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SupabaseService } from './supabase/supabase.service';
import { Product } from './interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private supabase = inject(SupabaseService);

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

  addProduct(
    name: string,
    description: string,
    price: number,
    image_urls: string,
    category: string,
    price_id: string,
    stripe_id: string
  ): Observable<Product> {
    return from(
      this.supabase.client
        .from('products')
        .insert({
          name,
          description,
          price,
          image_urls,
          category,
          price_id,
          stripe_id,
        })
        .select()
        .then(({ data, error }) => {
          if (error) {
            throw new Error(`Failed to add product:  ${error.message}`);
          }
          return data?.[0] ?? null;
        })
    );
  }

  addImage(file: File): Observable<string> {
    const filePath = `${Date.now()}-${file.name}`;

    return from(
      this.supabase.client.storage
        .from('products')
        .upload(filePath, file)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          const imageUrl = this.supabase.client.storage
            .from('products')
            .getPublicUrl(filePath).data.publicUrl;
          return imageUrl;
        })
    );
  }

  deleteImage(filePath: string): Observable<any> {
    const path = filePath.split('/products/')[1];
    return from(
      this.supabase.client.storage
        .from('products')
        .remove([path])
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })
    );
  }

  deleteProduct(id: number): Observable<Product | null> {
    return from(
      this.supabase.client
        .from('products')
        .delete()
        .eq('id', id)
        .select()
        .then(({ data, error }) => {
          if (error) {
            throw new Error(`Failed to delete product:  ${error.message}`);
          }
          return data?.[0] ?? null;
        })
    );
  }
}
