import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { OltErrorService } from '../services/error.service';

@Injectable()
export class OltGlobalErrorHandler implements ErrorHandler {

  private errorService!: OltErrorService;

  constructor(private injector: Injector) { }

  handleError(error: any): void {
    console.error('OltGlobalErrorHandler', error);
    this.errorService = this.injector.get<OltErrorService>(OltErrorService);
    const apiError = error instanceof HttpErrorResponse;
    this.errorService.log(error, apiError);
  }
}
