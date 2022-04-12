import { PersonName } from './person-name.model';

export class AuthenticatedUser {
  userPrincipalName!: string;
  name!: PersonName;
  authenticationType!: string;
  token!: string;
  issued!: string;
  expires!: string;
  expiresIn!: string;
  roles!: string[];
  permissions!: string[];
  otherClaims?: any;
  username!: string;
  email!: string;
  phone?: any;
  fullName!: string;

  get isValid(): boolean {
    return this.expired === false;
  }
  get expired(): boolean {
    return this.dateOfExpiration <= Date.now().valueOf();
  }
  get showWarning(): boolean {
    return this.remainingMinutes < 2;
  }
  get dateOfExpiration(): number {
    return new Date(this.expires).valueOf();
  }
  get remainingSeconds(): number {
    if (this.dateOfExpiration != null) {
      let seconds = this.dateOfExpiration - Date.now().valueOf();
      seconds %= 60;
      return seconds;
    }
    return 0;
  }
  get remainingMinutes(): number {
    if (this.dateOfExpiration != null) {
      const seconds = this.dateOfExpiration - Date.now().valueOf();
      return Math.floor(seconds / 60);
    }
    return 0;
  }

  constructor(data?: any) {
    this.userPrincipalName = data?.userPrincipalName;
    this.authenticationType = data?.authenticationType || data?.token_type || 'Bearer';
    this.token = data?.token || data?.access_token;
    this.issued = data?.issued;
    this.expires = data?.expires;
    this.expiresIn = data?.expiresIn || data?.expires_in;
    this.roles = data?.roles;
    this.permissions = data?.permissions;
    this.otherClaims = data?.otherClaims;
    this.username = data?.username;
    this.email = data?.email || data?.emailAddress;
    this.phone = data?.phone;
    this.fullName = data?.fullName;

    this.name = new PersonName(data?.name);

  }

}
