import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

export class PersonName {
  prefix?: string;
  first?: string;
  middle?: string;
  last?: string;
  suffix?: string;

  public static formGroup(fb: UntypedFormBuilder, required?: boolean): UntypedFormGroup {
    const validators = required === true ? [Validators.required] : [];
    return fb.group({
      first: [null, validators],
      middle: [null],
      last: [null, validators],
      suffix: [null],
    });
  }

  constructor(data?: any) {
    this.prefix = data?.prefix;
    this.first = data?.first;
    this.middle = data?.middle;
    this.last = data?.last;
    this.suffix = data?.suffix;
  }
}
