import { Component, OnDestroy } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, FormGroupName } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  template: ''
})
export abstract class OltBaseFormGroupComponent implements OnDestroy {

  private destroy$ = new Array<Subscription>();

  constructor(protected controlContainer: ControlContainer) { }


  ngOnDestroy(): void {
    this.destroy$.forEach(sub$ => {
      sub$.unsubscribe();
    });
  }

  get formGroup(): FormGroup {
    if (this.controlContainer instanceof FormGroupName) {
      return (this.controlContainer as FormGroupName).control;
    }

    if (this.controlContainer instanceof FormGroup) {
      return this.controlContainer as FormGroup;
    }

    if (this.controlContainer instanceof FormGroupDirective) {
      return (this.controlContainer as FormGroupDirective).control;
    }
    console.error(`Invalid form-group court container ${this.controlContainer}`);
    throw new Error('invalid');
  }


  protected set unsub(sub$: Subscription) {
    this.destroy$.push(sub$);
  }

}
