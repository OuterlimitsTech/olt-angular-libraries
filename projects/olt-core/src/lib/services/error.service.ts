import { Injectable, NgZone, inject } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NGXLogger } from 'ngx-logger';
import * as StackTraceParser from 'error-stack-parser';
import { OltAuthServiceBase } from './auth.service';
import { OltConfigServiceBase } from './config.service';
import { OltHelperService } from './helper.service';
import { Observable, from } from 'rxjs';

export interface IOltError {
  name: string | null;
  appId: string;
  user: string;
  time: number;
  id: string;
  url: string;
  status: string | null;
  message: string;
  stack: StackTraceParser.StackFrame[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class OltErrorService {
  private readonly authService = inject(OltAuthServiceBase);
  private readonly configService = inject(OltConfigServiceBase);
  private readonly helperService = inject(OltHelperService);
  private readonly location = inject(LocationStrategy);
  private readonly router = inject(Router);
  private readonly zone = inject(NgZone);
  private readonly logger = inject(NGXLogger);

  log(error: unknown, isApiError: boolean, showMessage = true): Observable<void> {
    const errorWithContext = this.addContextInfo(error);
    const growlMessage = { title: 'Error Occurred', message: errorWithContext.message };

    // Update logger configuration
    const config = this.logger.getConfigSnapshot();
    config.serverLoggingUrl = this.configService.serverLoggingUrl;

    if (this.authService.isAuthenticated && this.authService.token) {
      config.customHttpHeaders = new HttpHeaders({
        Authorization: `${this.authService.tokenType ?? 'Bearer'} ${this.authService.token}`,
      });
    }
    this.logger.updateConfig(config);

    // Handle error logging
    if (isApiError && error instanceof HttpErrorResponse) {
      growlMessage.message = !navigator.onLine ? '<h4>No Internet Connection</h4>' : 'API ERROR';
      this.logger.fatal(growlMessage.message, [errorWithContext]);
    } else {
      const logMethod = this.configService.isProduction ? this.logger.error : this.logger.trace;
      logMethod.call(this.logger, errorWithContext.message, [errorWithContext]);
      growlMessage.message = `<h4>${errorWithContext.message}</h4>`;
    }

    // Show growl message if enabled or in non-production
    if (showMessage || !this.configService.isProduction) {
      this.helperService.growlErrorMessage(growlMessage.message, growlMessage.title, {
        enableHtml: true,
        timeOut: 4000,
        closeButton: true,
      });
    }

    // Navigate to error page in production
    if (this.configService.isProduction) {
      return this.navigate('/application-error');
    }

    return from([]);
  }

  private navigate(url: string): Observable<void> {
    return new Observable((observer) => {
      this.zone.run(() =>
        this.router.navigate([url]).then(() => {
          window.location.reload();
          observer.complete();
        })
      );
    });
  }

  private addContextInfo(error: unknown): IOltError {
    const name = (error as Error)?.name ?? null;
    const appId = this.configService.applicationName;
    const user = this.authService.isAuthenticated ? this.authService.username ?? 'unknown' : 'anonymous';
    const time = Date.now();
    const id = `${appId}-${user}-${time}`;
    const url = this.location instanceof PathLocationStrategy ? this.location.path() : '';
    const status = (error as HttpErrorResponse)?.status?.toString() ?? null;
    const message = (error as Error)?.message ?? String(error);
    const stack = error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error as Error);

    return { name, appId, user, time, id, url, status, message, stack };
  }
}
