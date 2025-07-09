import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const AuthGuard: CanMatchFn = async(
  route: Route,
  segments: UrlSegment[]
) => {

const authService = inject(AuthService);
const router = inject(Router);

const isAuthEnticate = await  firstValueFrom(authService.userStatus());
console.log({isAuthEnticate});

 if(isAuthEnticate){
  router.navigateByUrl('/')
  return false
 }

  return true;
}
