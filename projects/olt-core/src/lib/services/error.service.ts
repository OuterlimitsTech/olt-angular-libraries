import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NGXLogger } from 'ngx-logger';
import * as StackTraceParser from 'error-stack-parser';
import { OltAuthServiceBase } from './auth.service';
import { OltConfigServiceBase } from './config.service';
import { OltHelperService } from './helper.service';
import { IGrowlMessage } from '../interfaces/growl-message.interface';


export interface IOltError {
  name: string;
  appId: string;
  user: string;
  time: number;
  id: string;
  url: string;
  status: string;
  message: string;
  stack: string | StackTraceParser.StackFrame[] | null;
}


@Injectable({
  providedIn: 'root'
})
export class OltErrorService {

  constructor(
    protected authService: OltAuthServiceBase,
    protected configService: OltConfigServiceBase,
    protected helperService: OltHelperService,
    protected location: LocationStrategy,
    protected router: Router,
    protected zone: NgZone,
    protected logger: NGXLogger
  ) { }

  log(error: any, navigateToErrorPage: boolean, showMessage?: boolean): void {
    const errorToSend = this.addContextInfo(error);
    const config = this.logger.getConfigSnapshot();
    const growlMessage: IGrowlMessage = { title: 'Error Occurred', message: errorToSend.message };

    config.serverLoggingUrl = this.configService.serverLoggingUrl;

    if (this.authService.isAuthenticated && this.authService.token != null) {
      const tokenType = this.authService.tokenType || 'Bearer';
      config.customHttpHeaders = new HttpHeaders({ Authorization: `${tokenType} ${this.authService.token}` });
    }
    this.logger.updateConfig(config);

    if (error instanceof HttpErrorResponse) {
      growlMessage.message = 'API ERROR';
      // Server or connection error happened
      if (!navigator.onLine) {
        growlMessage.message = `<h4>No Internet Connection</h4>`;
      } else {
        this.logger.fatal(errorToSend.message, [errorToSend]);
      }
    } else {
      if (this.configService.isProduction !== true) {
        this.logger.trace(errorToSend.message, [errorToSend]);
      } else {
        this.logger.error(errorToSend.message, [errorToSend]);
      }
      growlMessage.message = `<h4>${errorToSend.message}</h4>`;
    }

    if (showMessage === true || this.configService.isProduction !== true) {
      this.helperService.growlErrorMessage(growlMessage.message, growlMessage.title, { enableHtml: true, timeOut: 4000, closeButton: true });
    }

    if (this.configService.isProduction === true) {
      this.navigate('/application-error', navigateToErrorPage);
    }
  }

  navigate(url: string, navigateToErrorPage: boolean): void {
    if (navigateToErrorPage === true) {
      this.zone.run(() => this.router.navigate([url]).then(() => window.location.reload()));
    }
  }

  addContextInfo(error: any): IOltError {
    const name = error.name || null;
    const appId = this.configService.applicationName;
    const user = this.authService.isAuthenticated ? this.authService.username || 'unknown' : 'anonymous';
    const time = new Date().getTime();
    const id = `${appId}-${user}-${time}`;
    const url = this.location instanceof PathLocationStrategy ? this.location.path() : '';
    const status = error.status || null;
    const message = error.message || error.toString();
    const stack = error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error);

    const errorWithContext: IOltError = { name, appId, user, time, id, url, status, message, stack };
    return errorWithContext;
  }

}

