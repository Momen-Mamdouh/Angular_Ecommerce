import { HttpInterceptorFn } from '@angular/common/http';

export const coreInterceptor: HttpInterceptorFn = (req, next) => {

      if(localStorage.getItem('loginToken')){
        req = req.clone({
          setHeaders: {
            token: localStorage.getItem('loginToken')!,
          }
        });
        }
      return next(req);
};
