import { ActivatedRouteSnapshot } from '@angular/router';
import { INavLinkTab } from '../interfaces/nav-link-tab.interface';

export class NavLinkTab implements INavLinkTab {
  text!: string
  route!: string
  icon!: string | undefined;
  visible = true;

  get fullUrl(): string {
    return `${this.relativeRootUrl}/${this.route}`;
  }

  private relativeRootUrl!: string;

  private resolvedUrl(route: ActivatedRouteSnapshot): string {
    return '/' + route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .filter(t => t != null && t.length > 0)
      .join('/');
  }

  constructor(route: ActivatedRouteSnapshot, data: Partial<INavLinkTab>) {
    this.relativeRootUrl = this.resolvedUrl(route);

    if (data?.text != null && data?.text !== undefined) {
      this.text = data.text;
    } else {
      throw new Error('text is required');
    }


    if (data?.route != null && data?.route !== undefined) {
      this.route = data.route;
    } else {
      throw new Error('route is required');
    }

    if (data.visible === false) {
      this.visible = false;
    }

    this.icon = data?.icon;

  }

}