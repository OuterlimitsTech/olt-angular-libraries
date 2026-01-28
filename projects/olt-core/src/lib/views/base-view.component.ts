import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { PageConfig } from '../models/page-confg.model';
import { OltConfigServiceBase } from '../services/config.service';
import { OltUtility } from '../utilities/utility';

@Component({
  template: ''
})
export abstract class OltBaseViewComponent implements OnDestroy {

  public pageConfig = new PageConfig();
  private destroy$ = new Array<Subscription>();

  constructor() { }

  ngOnDestroy(): void {
    this.destroy$.forEach(sub$ => {
      sub$.unsubscribe();
    });
  }

  protected set unsub(sub$: Subscription | undefined) {
    if (sub$ != undefined) {
      this.destroy$.push(sub$);
    }
  }


  /**
  * @deprecated No longer manintained
  */
  subscribeTitleChange(router: Router, activatedRoute: ActivatedRoute, titleService: Title, configService: OltConfigServiceBase): void {
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => activatedRoute),
        map((route) => {
          while (route.firstChild) { route = route.firstChild; }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      ).subscribe((event) => {
        // tslint:disable-next-line: no-string-literal
        let title = event?.title != null ? event.title : configService.applicationTitle;
        let value: string | null = null;
        // let title = event.title ? event.title : 'IU';
        if (event.title != null) {
          const startIdx = event.title.indexOf('[');
          const endIdx = event.title.indexOf(']');
          if (startIdx > -1 && endIdx > -1) {
            title = this.simpleReplace(event, title);
            const objKey = event.title.substring(startIdx + 1, endIdx);
            value = OltUtility.findProp(event, objKey, null);
            if (value != null) {
              title = title.replace(`[${objKey}]`, value);
            }
          }
        }
        titleService.setTitle(title);
      });
  }

  private simpleReplace(event: any, title: string): string {
    Object.keys(event).forEach(key => {
      if (key !== 'title') {
        const value = event[key];
        title = title.replace(`[${key}]`, value);
      }
    });
    return title;
  }

}

