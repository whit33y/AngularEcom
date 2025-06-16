import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SupabaseService } from './supabase/supabase.service';

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
}

export type Category = {
  id: number;
  name: string;
};
