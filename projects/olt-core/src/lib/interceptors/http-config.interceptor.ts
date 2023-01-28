import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { OltAuthServiceBase } from '../services';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OltConfigServiceBase } from '../services/config.service';



export abstract class OltHttpConfigInterceptor implements HttpInterceptor {

  constructor(
    protected configService: OltConfigServiceBase,
    protected authService: OltAuthServiceBase,
    protected router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isSmartyStreets = request.url.indexOf('smartystreets.com') > -1;
    if (!isSmartyStreets) {
      if (this.authService.isAuthenticated && this.authService.token != null) {
        const tokenType = this.authService.tokenType || 'Bearer';
        request = request.clone({
          setHeaders: {
            Authorization: `${tokenType} ${this.authService.token}`
          }
        });
      }

      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
        }
      });

      const url = this.configService.apiUrl(request.url);
      request = request.clone({ url });
    }


    return next.handle(request).pipe(
      // map((event: HttpEvent<any>) => {
      //   if (event instanceof HttpResponse) {
      //     // console.log('event--->>>', event);
      //     // this.errorDialogService.openDialog(event);
      //   }
      //   return event;
      // }),

      catchError((error: HttpErrorResponse) => {
        // if (error.status === HttpStatusCode.BadRequest && error.error && error.error.validationErrors && error.error.validationErrors.length > 0) {
        //   // this._modalService.showValidationModal(err.error.validationErrors);
        //   return throwError(error);
        // }

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

}
