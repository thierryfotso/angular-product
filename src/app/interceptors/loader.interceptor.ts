import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
import { LoaderServiceService } from '../services/loader/loader-service.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderServiceService);
  loaderService.show();
  return next(req).pipe(
    finalize(() => loaderService.hide())
  );
};
