import { ErrorHandler, Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { OltErrorService } from '../services/error.service';

@Injectable({
  providedIn: 'root',
})
export class OltGlobalErrorHandler implements ErrorHandler {
  private readonly errorService = inject(OltErrorService);

  handleError(error: unknown): void {
    console.error('OltGlobalErrorHandler:', error);
    const isApiError = error instanceof HttpErrorResponse;
    this.errorService.log(error, isApiError);
  }
}
