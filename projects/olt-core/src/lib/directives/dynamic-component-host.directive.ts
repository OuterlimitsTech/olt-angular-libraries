import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[olt-dynamic-component-host]',
    standalone: false
})
export class DynamicComponentHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
