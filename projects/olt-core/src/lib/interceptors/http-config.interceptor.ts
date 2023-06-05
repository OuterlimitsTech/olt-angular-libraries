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
