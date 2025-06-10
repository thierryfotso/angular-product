import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

//const exclude_array : string[] = ['/login','/register','/verifyEmail'];
const exclude_array : string[] = [];

function toExclude(url: string): boolean {
  var length = exclude_array.length;
  for (var i = 0; i < length; i++) {
    if (url.search(exclude_array[i]) != -1) return true;
  }
  return false;
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  //tester s'il sagit de login, on n'ajoute pas le header Authorization
  //puisqu'on a pas encore de JWT (il est null)
  const jwt = authService.getToken();
  if (jwt && !toExclude(req.url)) {
    const reqWithToken = req.clone({
      setHeaders: { Authorization: 'Bearer ' + jwt },
    });
    return next(reqWithToken);
  }
  return next(req);
};

