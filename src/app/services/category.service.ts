import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SupabaseService } from './supabase/supabase.service';
import { Category } from './interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private supabase = inject(SupabaseService);

  getCategories(): Observable<Category[]> {
    return from(
      this.supabase.client
        .from('categories')
        .select('*')
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })
    );
  }

  addCategory(name: string): Observable<Category[]> {
    return from(
      this.supabase.client
        .from('categories')
        .insert({ name })
        .select()
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })
    );
  }

  deleteCateogry(id: number): Observable<Category | null> {
    return from(
      this.supabase.client
        .from('categories')
        .delete()
        .eq('id', id)
        .select()
        .then(({ data, error }) => {
          if (error) {
            throw new Error(`Failed to delete category:  ${error.message}`);
          }
          return data?.[0] ?? null;
        })
    );
  }
}
