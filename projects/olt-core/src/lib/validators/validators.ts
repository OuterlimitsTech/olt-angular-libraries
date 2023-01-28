import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActionFunc } from "../interfaces/deletgates.interface";
import { OltUtility } from "../utilities";

export namespace OltValidators {

  export class DateTimeValidators extends Validators {

    static isTimeBefore(min: ActionFunc<Date | null> | null): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const fg = control as FormGroup<any>;
        const date = OltUtility.combineDateAndTime(fg.get('date')?.value, fg.get('time')?.value);
        const minDate = (min != null ? min() : null) ?? new Date('0001-01-01T00:00:00Z');
        const msg: ValidationErrors = { isTimeBefore: { message: `Must be after ${minDate.toLocaleDateString()} ${minDate.toLocaleTimeString()}` } };
        if (date != null && date < minDate) {
          return msg;
        }
        return null;
      }
    }
    static isTimeAfter(max: ActionFunc<Date | null> | null): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        const fg = control as FormGroup<any>;
        const date = OltUtility.combineDateAndTime(fg.get('date')?.value, fg.get('time')?.value);
        const maxDate = (max != null ? max() : null) ?? new Date('9999-12-31T23:59:59Z');
        const msg: ValidationErrors = { isTimeAfter: { message: `Must be before ${maxDate.toLocaleDateString()} ${maxDate.toLocaleTimeString()}` } };
        if (date != null && date > maxDate) {
          return msg;
        }
        return null;
      }
    }
  }

}