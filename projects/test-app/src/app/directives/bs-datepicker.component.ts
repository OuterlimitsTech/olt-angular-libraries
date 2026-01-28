import { ChangeDetectorRef, Directive, ElementRef, Host, Input, Renderer2 } from "@angular/core";
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { BsDatepickerInputDirective, BsLocaleService } from 'ngx-bootstrap/datepicker';
import {
    isAfter,
    isBefore,
    isDate,
    isDateValid,
  } from 'ngx-bootstrap/chronos';


import { BsDatepickerDirective } from "ngx-bootstrap/datepicker";

@Directive({
    selector: '[oltDatepicker]',
    exportAs: 'oltDatepicker',
    standalone: false
})
export class OltBsDatepickerDirective extends BsDatepickerDirective {

}


@Directive({
    selector: `input[oltDatepicker]`,
    standalone: false
})
export class OltNgxBsDatepickerInputDirective extends BsDatepickerInputDirective {
@Input() dateMaskValue: string | Date | null = null;
private _oltPicker: OltBsDatepickerDirective;

constructor(
  @Host() picker: OltBsDatepickerDirective,
          localeService: BsLocaleService,
          renderer: Renderer2,
          elRef: ElementRef,
          changeDetection: ChangeDetectorRef) {
  super(picker, localeService, renderer, elRef, changeDetection);    
  this._oltPicker = picker;
}

  override validate(c: AbstractControl<any, any>): ValidationErrors | null {
      const _value: Date | string = c.value;

      if (_value === null || _value === undefined || _value === '') {
    return null;
  }

  if (isDate(_value)) {
    const _isDateValid = isDateValid(_value);
    if (!_isDateValid) {
      return { bsDate: { invalid: _value } };
    }

    if (this._oltPicker && this._oltPicker.minDate && isBefore(_value, this._oltPicker.minDate, 'date')) {
      this.writeValue(this._oltPicker.minDate);

      return { bsDate: { minDate: this._oltPicker.minDate } };
    }

    if (this._oltPicker && this._oltPicker.maxDate && isAfter(_value, this._oltPicker.maxDate, 'date')) {
      this.writeValue(this._oltPicker.maxDate);

      return { bsDate: { maxDate: this._oltPicker.maxDate } };
    }
  }

  return null;
  }
}

