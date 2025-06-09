import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const email = await authService.getUserEmail();
  if (!email) {
    return router.createUrlTree(['/']);
  }

  const admin = await firstValueFrom(authService.isAdmin(email));

  if (admin) {
    return true;
  } else {
    return router.createUrlTree(['/']);
  }
};
