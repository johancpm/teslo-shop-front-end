import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const AuthAdminGuard: CanMatchFn = async(
  route: Route,
  segments: UrlSegment[]
) => {

const authService = inject(AuthService);


 await  firstValueFrom(authService.userStatus());

   return authService.isAdmin();


}
