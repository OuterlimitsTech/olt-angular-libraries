import { Component, Input } from '@angular/core';
import { IFormGroupValidationState } from '../../interfaces/form-group-validation-state.interface';
import { FormGroupValidationState } from '../../models/form-group-validation-state.model';

@Component({
  selector: 'olt-control-label',
  templateUrl: './control-label.component.html',
  styleUrls: ['./control-label.component.scss']
})
export class ControlLabelComponent {
  @Input() srOnly = false;
  @Input() for!: string;
  @Input() validationState!: IFormGroupValidationState;

  constructor() { }

  get state(): FormGroupValidationState {
    return new FormGroupValidationState(this.validationState);
  }

  get required(): boolean {
    return this.state?.required === true;
  }

  get error(): boolean {
    return this.state?.error === true;
  }

  get success(): boolean {
    return this.state?.success === true;
  }
}
