import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { inject } from '@angular/core';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  spinnerService.show();

  return next(req).pipe(
    finalize(() => {
      spinnerService.hide();
    })
  );
};
