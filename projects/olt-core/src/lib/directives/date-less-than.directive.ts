import { throwError } from 'rxjs';
import { Attribute, Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { OltUtility } from '../utilities/utility';
declare let dayjs: any;

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[oltDateLessThan]',
    providers: [{ provide: NG_VALIDATORS, useExisting: DateLessThanDirective, multi: true }],
    standalone: false
})
export class DateLessThanDirective implements Validator {
  @Input('oltDateLessThan') fromControl!: AbstractControl;

  constructor(@Attribute('oltDateLessThanMessage') public message: string) { }

  validate(control: AbstractControl): ValidationErrors | null {
    // throw new Error('Method not implemented.');

    if (dayjs === undefined) {
      throwError('dayJs isSameOrAfter is not loaded');
      return null;
    }

    const dtFrom = this.fromControl.value;
    const dtTo = control.value;


    if (OltUtility.isDate(dtFrom) && OltUtility.isDate(dtTo)) {
      const start = dayjs(dtFrom);
      const end = dayjs(dtTo);

      if (typeof end.isSameOrAfter !== 'function') {
        throwError('dayJs isSameOrAfter is not loaded');
      }

      if (!end.isSameOrAfter(start)) {

        return {
          dateLessThan: {
            message: this.message || 'invalid'
          }
        };

        // return {
        //   message: 'End Date must be on or after Start Date'
        // };
      }
    }


    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    // throw new Error('Method not implemented.');
  }

}
