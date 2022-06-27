import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { IDomesticPhone } from '../interfaces/domestic-phone.interface';

export class DomesticPhone implements IDomesticPhone {
  number!: string;
  ext?: string;

  public static formGroup(fb: UntypedFormBuilder, required?: boolean): UntypedFormGroup {
    const validators = new Array<Validators>();
    validators.push(Validators.minLength(10));
    if (required === true) {
      validators.push(Validators.required);
    }
    return fb.group({
      number: [null, validators],
      ext: [null],
    });
  }

  constructor(data?: IDomesticPhone | any) {
    this.number = data?.number;
    this.ext = data?.ext;
  }
}
