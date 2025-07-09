import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@auth/services/auth.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  const Token = inject(AuthService).token();
  console.log(Token);

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${Token}`),
  });
  return next(newReq);
}
