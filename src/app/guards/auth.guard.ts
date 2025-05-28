import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  const { data } = await authService.getSession();

  if (data.session) {
    console.log('Zalogowany!');
    return true;
  } else {
    console.log('Niezalogowany!');
    return false;
  }
};
