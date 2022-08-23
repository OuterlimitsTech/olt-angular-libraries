import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors } from "@angular/forms";

export class FormControlError {

  formatMessage(label?: string | null): string {
    let msg = 'invalid';

    switch (this.error) {

      case 'minlength':
        msg = 'too short';
        break;
      case 'maxlength':
        msg = 'too long';
        break;
      case 'required':
        msg = 'required';
        break;
      case 'min':
        msg = 'too low';
        break;
      case 'max':
        msg = 'too high';
        break;
      case 'email':
        msg = 'invalid';
        break;
      default:
        if (this.value?.message != undefined && this.value?.message != null) {
          return this.value?.message
        }
        break;
    }

    return `${label || 'This Field'} ${msg}`
  }

  get message(): string {
    return this.formatMessage(this.label);
  }

  constructor(
    public controlKey: string,
    public control: UntypedFormGroup | UntypedFormControl | AbstractControl | null,
    public error: string,
    public value: ValidationErrors,
    public label?: string | null | undefined) {
  }
}