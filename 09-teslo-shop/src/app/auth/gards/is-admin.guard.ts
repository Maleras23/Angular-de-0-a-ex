import { inject } from '@angular/core';
import { Route, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';


export const IsAdminGuard = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);

  await firstValueFrom( authService.checkStatus());

  return authService.isAdmin();
}
