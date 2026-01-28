import { IOltConfigService } from '../interfaces/config-service.interface';
import { UrlTree } from '@angular/router';

/**
 * @deprecated No longer manintained
 */
export abstract class OltConfigServiceBase implements IOltConfigService {
  abstract get applicationName(): string;
  abstract get applicationTitle(): string;
  abstract get supportEmail(): string;
  abstract get apiRootUrl(): string;
  abstract get isProduction(): boolean;
  abstract get serverLoggingUrl(): string;
  abstract get permissionDeniedRoute(): string | UrlTree;
  abstract get accessDeniedRoute(): string | UrlTree;
  abstract get applicationErrorRoute(): string | UrlTree;
  abstract get loginRoute(): string | UrlTree;
  abstract apiUrl(url: string): string;
}

