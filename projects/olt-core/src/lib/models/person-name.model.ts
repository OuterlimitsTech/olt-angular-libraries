import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

export interface IPersonNameForm {
  first: FormControl<string | null>;
  middle: FormControl<string | null>;
  last: FormControl<string | null>;
  suffix: FormControl<string | null>;
}

export interface IPersonName {
  prefix?: string;
  first?: string;
  middle?: string;
  last?: string;
  suffix?: string;
}

export class PersonName implements IPersonName {
  prefix?: string;
  first?: string;
  middle?: string;
  last?: string;
  suffix?: string;

  public static formGroup(fb: FormBuilder, required?: boolean): FormGroup<IPersonNameForm> {
    const validators = required === true ? [Validators.required] : [];
    return fb.group<IPersonNameForm>({
      first: new FormControl<string | null>(null, validators),
      middle: new FormControl<string | null>(null),
      last: new FormControl<string | null>(null, validators),
      suffix: new FormControl<string | null>(null),
    });
  }

  constructor(data?: IPersonName | any) {
    this.prefix = data?.prefix;
    this.first = data?.first;
    this.middle = data?.middle;
    this.last = data?.last;
    this.suffix = data?.suffix;
  }
}
