import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const skipWarningInterceptor: HttpInterceptorFn = (req, next) => {
  // const skipWarningHeader = Object.keys(environment.defaultHeaders)[0];
  // const skipWarningValue = Object.values(environment.defaultHeaders)[0];
  // const headers = req.headers.set(skipWarningHeader, skipWarningValue);
  // req = req.clone({ headers });

  return next(req);
};
