import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toExclude = '/login';
  //tester s'il sagit de login, on n'ajoute pas le header Authorization
  //puisqu'on a pas encore de JWT (il est null)
  if (req.url.search(toExclude) === -1) {
    const jwt = authService.getToken();
    const reqWithToken = req.clone({
      setHeaders: { Authorization: 'Bearer ' + jwt },
    });
    return next(reqWithToken);
  }
  return next(req);
};
