import { OltUtility } from './../utilities/utility';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { OltValidators } from '../validators/validators';
import { ActionFunc } from '../interfaces';

export interface IDateAndTimeForm {
  date: FormControl<Date | null>,
  time: FormControl<Date | null>,
}


export interface IDateAndTime {
  date: Date | null;
  time: Date | null;
}

export class DateAndTime implements IDateAndTime {
  date: Date | null = null;
  time: Date | null = null;

  combine(): Date | null {
    return OltUtility.combineDateAndTime(this.date, this.time);
  }

  public static formGroup(fb: FormBuilder, defaultDate: Date | null, required: boolean = false, min: ActionFunc<Date | null> | null, max: ActionFunc<Date | null> | null): FormGroup<IDateAndTimeForm> {
    const validators = required === true ? [Validators.required] : [];
    return new FormGroup<IDateAndTimeForm>({
      date: new FormControl<Date | null>(defaultDate, validators),
      time: new FormControl<Date | null>(defaultDate, validators),
    }, [OltValidators.DateTimeValidators.isTimeBefore(min), OltValidators.DateTimeValidators.isTimeAfter(max)]);
  }

  constructor(data?: any) {
    this.date = data?.date;
    this.time = data?.time;
  }
}
