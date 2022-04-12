import { UrlTree } from '@angular/router';

export interface IOltConfigService {
  readonly applicationName: string;
  readonly applicationTitle: string;
  readonly supportEmail: string;
  readonly apiRootUrl: string;
  readonly isProduction: boolean;
  readonly serverLoggingUrl: string;
  readonly permissionDeniedRoute: string | UrlTree;
  readonly accessDeniedRoute: string | UrlTree;
  readonly applicationErrorRoute: string | UrlTree;
  readonly loginRoute: string | UrlTree;
  apiUrl(url: string): string;
}
