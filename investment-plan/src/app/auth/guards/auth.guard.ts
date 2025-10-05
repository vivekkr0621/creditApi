import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';
import { environment } from '../../../environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  // ✅ Skip login in development
  if (!environment.production) {
    return true;
  }

  if (authService.isAuthenticated()) {
    return true;
  }

  // ✅ Prevent infinite redirect
  if (state.url !== '/login') {
    toast.error('Please login to access this page');
    router.navigate(['/login']);
  }

  return false;
};
