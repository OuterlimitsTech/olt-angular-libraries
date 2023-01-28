import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IDomesticPhone } from '../interfaces/domestic-phone.interface';

export interface IDomesticPhoneForm {
  number: FormControl<string | null>;
  ext: FormControl<string | null>;
}

export class DomesticPhone implements IDomesticPhone {
  number!: string;
  ext?: string;

  public static formGroup(fb: FormBuilder, required?: boolean): FormGroup<IDomesticPhoneForm> {
    const validators = required === true ? [Validators.required, Validators.minLength(10)] : [Validators.minLength(10)];
    return fb.group<IDomesticPhoneForm>({
      number: new FormControl<string | null>(null, validators),
      ext: new FormControl<string | null>(null)
    });
  }

  constructor(data?: IDomesticPhone | any) {
    this.number = data?.number;
    this.ext = data?.ext;
  }
}
