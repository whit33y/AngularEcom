import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const { data } = await authService.getSession();

  if (!data.session) {
    console.log('Niezalogowany');
    return true;
  } else {
    console.log('Zalogowany');
    return router.createUrlTree(['/products']);
  }
};
