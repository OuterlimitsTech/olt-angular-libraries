import { Directive, HostBinding, Input } from '@angular/core';
import { IFormGroupValidationState } from '../interfaces/form-group-validation-state.interface';
import { FormGroupValidationState } from '../models/form-group-validation-state.model';

@Directive({
    selector: '[oltFormGroupClass]',
    standalone: false
})
export class FormGroupStyleDirective {
  @Input() oltFormGroupClass!: IFormGroupValidationState;
  @Input() defaultClass = 'olt-form-group';

  constructor() { }

  get state(): FormGroupValidationState {
    return new FormGroupValidationState(this.oltFormGroupClass);
  }

  @HostBinding('class')
  get value(): string {
    if (this.state?.error) {
      return `${this.defaultClass} invalid`;
    } else if (this.state?.success) {
      return `${this.defaultClass} success`;
    }
    return this.defaultClass;
  }


}
