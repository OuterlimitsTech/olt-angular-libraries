import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[olt-dynamic-component-host]'
})
export class DynamicComponentHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
