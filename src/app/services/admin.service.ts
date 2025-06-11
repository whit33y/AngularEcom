import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase/supabase.service';
import { from, Observable } from 'rxjs';
import { Admin } from './interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private supabase = inject(SupabaseService);

  deleteAdmin(email: string): Observable<Admin | null> {
    return from(
      this.supabase.client
        .from('admins')
        .delete()
        .eq('email', email)
        .select()
        .then(({ data, error }) => {
          if (error) {
            throw new Error(`Failed to delete admin:  ${error.message}`);
          }
          return data?.[0] ?? null;
        })
    );
  }

  addAdmin(email: string): Observable<Admin | null> {
    return from(
      this.supabase.client
        .from('admins')
        .insert({ email: email })
        .select()
        .then(({ data, error }) => {
          if (error) {
            console.error(`Inserting admin error: ${error.message}`);
          }
          return data?.[0] ?? null;
        })
    );
  }
}
