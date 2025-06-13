import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token') ?? '';
  req = req.clone({
    // setHeaders: {
    //   Authorization: `Bearer ${token}`,
    //   'ngrok-skip-browser-warning': '69420',
    // },
  });
  return next(req);
};
