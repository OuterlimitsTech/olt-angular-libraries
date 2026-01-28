import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpInterceptorFn,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

const ISO_8601 =
  /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

function isIso8601(value: any): boolean {
  if (value === null || value === undefined) return false;
  return typeof value === 'string' && ISO_8601.test(value);
}

function convertToDate(body: any): void {
  if (body === null || body === undefined) return;
  if (typeof body !== 'object') return;

  // handle arrays too (since arrays are objects, but Object.keys works fine)
  for (const key of Object.keys(body)) {
    const value = body[key];

    if (isIso8601(value)) {
      body[key] = new Date(value);
      continue;
    }

    if (typeof value === 'string') {
      const parts = value.match(DATE_ONLY);
      if (parts) {
        body[key] = new Date(
          parseInt(parts[1], 10),
          parseInt(parts[2], 10) - 1,
          parseInt(parts[3], 10)
        );
        continue;
      }
    }

    if (value && typeof value === 'object') {
      convertToDate(value);
    }
  }
}

export const oltAngularDateInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          convertToDate(event.body);
        }
      },
      error: (err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          // keep your existing no-op 401 handling
        }
      },
    })
  );
};


/**
 * @deprecated Use `oltAngularDateInterceptor` instead
 */
@Injectable()
export class OltAngularDateHttpInterceptor implements HttpInterceptor {
  // Migrated from AngularJS https://raw.githubusercontent.com/Ins87/angular-date-interceptor/master/src/angular-date-interceptor.js
  iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;
  dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        this.convertToDate(body);
      }
    },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
          }
        }
      }));
  }

  convertToDate(body: any): void {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      let parts;
      if (this.isIso8601(value)) {
        body[key] = new Date(value);
        // tslint:disable-next-line: no-conditional-assignment
      } else if (value && value.match && (parts = value.match(this.dateOnly))) {
        body[key] = new Date(parseInt(parts[1], 10), parseInt(parts[2], 10) - 1, parseInt(parts[3], 10));
      } else if (typeof value === 'object') {
        this.convertToDate(value);
      }
    }
  }

  isIso8601(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    return this.iso8601.test(value);
  }
}
