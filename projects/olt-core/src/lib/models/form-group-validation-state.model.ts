import { IFormGroupValidationState } from '../interfaces/form-group-validation-state.interface';

export class FormGroupValidationState {

  get required(): boolean {
    return this.value?.required === true && this.value?.invalid === true;
  }

  get error(): boolean {
    return (this.value?.touched === true || this.value?.dirty === true) && this.value?.invalid === true;
  }

  get success(): boolean {
    return this.value?.dirty === true && this.value?.invalid === false && this.value?.hasValue === true;
  }

  constructor(public value: IFormGroupValidationState) { }
}
