import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase/supabase.service';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { Admin } from './interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  sessionStatus = signal(false);
  private supabase = inject(SupabaseService);
  constructor() {
    this.supabase.client.auth.getSession().then(({ data }) => {
      this.sessionStatus.set(!!data.session);
    });
    this.supabase.client.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        this.sessionStatus.set(!!session);
      }
    );
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signUp({
      email,
      password,
    });
    return { data, error };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password,
    });
    if (data.session) {
      this.sessionStatus.set(true);
    }

    return { data, error };
  }

  async signOut() {
    const { error } = await this.supabase.client.auth.signOut();
    this.sessionStatus.set(false);
    return error;
  }

  async getUserEmail(): Promise<string | undefined | null> {
    const { data, error } = await this.supabase.client.auth.getUser();
    if (error || !data.user) {
      return null;
    }
    return data.user.email;
  }

  getUsers(): Observable<Admin[]> {
    return from(
      this.supabase.client
        .from('admins')
        .select('*')
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })
    );
  }

  isAdmin(email: string): Observable<Admin> {
    return from(
      this.supabase.client
        .from('admins')
        .select('*')
        .eq('email', email)
        .maybeSingle()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error while searching for admin:', error);
            return null;
          }
          return data;
        })
    );
  }

  getSession() {
    return this.supabase.client.auth.getSession();
  }
}
