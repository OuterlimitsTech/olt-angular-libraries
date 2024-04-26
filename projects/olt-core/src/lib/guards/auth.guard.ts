import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OltAuthServiceBase } from '../services/auth.service';
import { OltConfigServiceBase } from '../services/config.service';


@Injectable({
  providedIn: 'root'
})
export class OltAuthGuard  {
  constructor(
    private authenticationService: OltAuthServiceBase,
    private configService: OltConfigServiceBase,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authenticationService.isAuthenticated) {
      return true;
    } else {
      this.authenticationService.logout(false);
      if (this.configService.loginRoute instanceof UrlTree) {
        return this.configService.loginRoute as UrlTree;
      }
      const url = this.configService.loginRoute as string;
      this.router.navigate([url], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
