export interface IOltAuthService {
  readonly isAuthenticated: boolean;
  readonly tokenType: string | null | undefined;
  readonly token: string | null | undefined;
  readonly username: string | null;
  readonly fullName: string | null;
  login(): void;
  logout(logoutOpenId: boolean): void;
  processOpenIdToken(): void;
}
