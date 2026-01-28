import { Component, inject } from '@angular/core';
import { ControlContainer, UntypedFormGroup, FormGroupDirective, FormGroupName } from '@angular/forms';
import { OltBaseViewComponent } from './base-view.component';

@Component({
    template: '',
    standalone: false
})
export abstract class OltBaseFormGroupComponent extends OltBaseViewComponent {

  protected controlContainer = inject(ControlContainer);

  constructor() { super(); }

  get formGroup(): UntypedFormGroup {
    if (this.controlContainer instanceof FormGroupName) {
      return (this.controlContainer as FormGroupName).control;
    }

    if (this.controlContainer instanceof UntypedFormGroup) {
      return this.controlContainer as UntypedFormGroup;
    }

    if (this.controlContainer instanceof FormGroupDirective) {
      return (this.controlContainer as FormGroupDirective).control;
    }
    console.error(`Invalid form-group container ${this.controlContainer}`);
    throw new Error('invalid');
  }


}
