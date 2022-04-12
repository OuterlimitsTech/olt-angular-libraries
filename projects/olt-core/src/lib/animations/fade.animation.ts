import { trigger, animate, transition, style, query, group } from '@angular/animations';

// https://fireship.io/lessons/angular-router-animations/
export const routeAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
        }),
      ], { optional: true }),
      group([
        query(':enter', [
          style({ opacity: 0 }),
          animate('500ms ease-in-out', style({ opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1 }),
          animate('500ms ease-in-out', style({ opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
  ]);
