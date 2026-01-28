import { Injectable } from '@angular/core';
import { IOltAuthService } from '../interfaces/auth-service.interface';

/**
 * @deprecated No longer manintained
 */
@Injectable({
  providedIn: 'root'
})
export abstract class OltAuthServiceBase implements IOltAuthService {
  abstract get isAuthenticated(): boolean;
  abstract get tokenType(): string | null | undefined;
  abstract get token(): string | null | undefined;
  abstract get username(): string | null;
  abstract get fullName(): string | null;
  abstract login(): void;
  abstract logout(logoutOpenId: boolean): void;
  abstract processOpenIdToken(): void;
}
