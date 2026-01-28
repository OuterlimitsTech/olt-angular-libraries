import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { OltAuthServiceBase } from '../services';
import { OltConfigServiceBase } from '../services/config.service';

// export type OltHttpConfigInterceptorHooks = Partial<{
//   configureApiUrl: (req: HttpRequest<any>, cfg: OltConfigServiceBase) => HttpRequest<any>;
//   configureBearer: (req: HttpRequest<any>, auth: OltAuthServiceBase) => HttpRequest<any>;
//   configureCORS: (req: HttpRequest<any>) => HttpRequest<any>;
// }>;

// export function oltHttpConfigInterceptor(
//   hooks: OltHttpConfigInterceptorHooks = {}
// ): HttpInterceptorFn {
//   return (request, next) => {
//     const configService = inject(OltConfigServiceBase);
//     const authService = inject(OltAuthServiceBase);
//     const router = inject(Router);

//     const configureApiUrl =
//       hooks.configureApiUrl ??
//       ((req, cfg) => req.clone({ url: cfg.apiUrl(req.url) }));

//     const configureBearer =
//       hooks.configureBearer ??
//       ((req, auth) => {
//         if (auth.isAuthenticated && auth.token != null) {
//           const tokenType = auth.tokenType || 'Bearer';
//           return req.clone({
//             setHeaders: { Authorization: `${tokenType} ${auth.token}` },
//           });
//         }
//         return req;
//       });

//     const configureCORS =
//       hooks.configureCORS ??
//       ((req) => {
//         // Intentionally a no-op (same as your class version)
//         // If you ever need this:
//         // return req.clone({ setHeaders: { 'Access-Control-Allow-Origin': '*' } });
//         return req;
//       });

//     request = configureBearer(request, authService);
//     request = configureCORS(request);
//     request = configureApiUrl(request, configService);

//     return next(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === HttpStatusCode.Unauthorized) {
//           if (configService.isProduction !== true) {
//             console.error('Auth Error', error);
//             return throwError(() => error);
//           }

//           if (authService.isAuthenticated) {
//             router.navigateByUrl(configService.permissionDeniedRoute);
//           } else {
//             router.navigateByUrl(configService.accessDeniedRoute);
//           }
//         }

//         return throwError(() => error);
//       })
//     );
//   };
// }

/**
 * @deprecated No longer manintained
 */
export abstract class OltHttpConfigInterceptor implements HttpInterceptor {

  constructor(
    protected configService: OltConfigServiceBase,
    protected authService: OltAuthServiceBase,
    protected router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.configureBearer(request);
    request = this.configureCORS(request);
    request = this.configureApiUrl(request);

    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {


        if (error.status === HttpStatusCode.Unauthorized) {
          if (this.configService.isProduction !== true) {
            console.error('Auth Error', error);
            return throwError(() => error);
          }

          if (this.authService.isAuthenticated) {
            this.router.navigateByUrl(this.configService.permissionDeniedRoute);
          } else {
            this.router.navigateByUrl(this.configService.accessDeniedRoute);
          }
        }
        return throwError(() => error);
      })
    );


  }


  protected configureApiUrl(request: HttpRequest<any>): HttpRequest<any> {
    const url = this.configService.apiUrl(request.url);
    return request.clone({ url });
  }

  protected configureBearer(request: HttpRequest<any>): HttpRequest<any> {
    if (this.authService.isAuthenticated && this.authService.token != null) {
      const tokenType = this.authService.tokenType || 'Bearer';
      return request.clone({
        setHeaders: {
          Authorization: `${tokenType} ${this.authService.token}`
        }
      });
    }
    return request;
  }

  protected configureCORS(request: HttpRequest<any>): HttpRequest<any> {
    // return request.clone({
    //   setHeaders: {
    //     'Access-Control-Allow-Origin': '*',
    //   }
    // });
    return request;
  }


}
