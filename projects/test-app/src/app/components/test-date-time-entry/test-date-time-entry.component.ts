import { Component, Input, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { OltUtility } from '@outerlimitstech/ngx-app-core';

@Component({
  selector: 'olt-test-date-time-entry, [formGroupName] olt-test-date-time-entry, [formGroup] olt-test-date-time-entry',
  templateUrl: './test-date-time-entry.component.html',
  styleUrls: ['./test-date-time-entry.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestDateTimeEntryComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TestDateTimeEntryComponent),
      multi: true,
    }   
  ]
})
export class TestDateTimeEntryComponent implements ControlValueAccessor, Validator  {
  @Input() placeholder: string | null = "mm/dd/yyyy";
  @Input() min: Date = new Date('0001-01-01T00:00:00Z');
  @Input() max: Date = new Date('9999-12-31T23:59:59Z');
  
  dateValue: Date | any | null = null;  
  timeValue: Date | any | null = null;  
  _timeValue: Date | any | null = null;  

  disabled = false;
  //touched = false;

  onChange: any = () => { };
  onTouched: any = () => { };
  onValidatorChange?: any = () => { };


  writeValue(value: Date | null): void {    
    console.log('writeValue', value, value?.toLocaleTimeString());
    this._timeValue = value;
    this.dateValue = value;
    this.timeValue = value;
  }

  valueChanged(date: Date | null, time: Date | null){
    if (date != null && time != null) {            
      this.dateValue = OltUtility.combineDateAndTime(new Date(date.toDateString()), time);
      this.onChange(this.dateValue);
      return;
    }   
    this.onChange(null);
  }

  dateChanged(event: Date | null) {
    this.valueChanged(event, this.timeValue);
  }

  timeChanged(event: Date | null) {    
    if (this._timeValue?.toLocaleTimeString() != event?.toLocaleTimeString()) {
      this._timeValue = event;
      this.valueChanged(this.dateValue, event);  
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log('validate',  this.dateValue, control);


    if (this.dateValue != null) {
      const maxTime = this.max?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      const minTime = this.min?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

      
      if (this.dateValue < this.min) {

        if (new Date(this.dateValue.toLocaleDateString()) == new Date(this.min.toLocaleDateString())){
          return { minDateTime : { valid: false, message: `Time is before ${minTime}` } };
        } else{
          return { minDateTime : { valid: false, message: `Date/Time is before ${this.min?.toLocaleDateString()} ${minTime}` } };
        }      

      } else if (this.dateValue > this.max) {

        if (new Date(this.dateValue.toLocaleDateString()) == new Date(this.max.toLocaleDateString())){
          return { minDateTime : { valid: false, message: `Time is after ${maxTime}` } };
        } else{
          return { minDateTime : { valid: false, message: `Date/Time is after ${this.max?.toLocaleDateString()} ${maxTime}` } };
        }    

      }
    }
    

    const invalidDate = this.dateValue == null && this.timeValue != null;
    const invalidTime = this.dateValue != null && this.timeValue == null;

    if (invalidDate) {
      return { invalidDate: { valid: false, message: 'Invalid Date' } };
    } 
    
    if (invalidTime) {
      return { invalidTime: { valid: false, message: 'Invalid Time' } };    }
    


    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
  
  // @HostListener('window:keydown', ['$event'])
  // onKeyDown(event: KeyboardEvent) {
  //   console.log(event);
    
  //   // if (this.appMaskValue && (this.appMaskValue.length === 2 || this.appMaskValue.length === 5) && event.key !== 'Backspace') {
  //   //   this.renderer.setProperty(this.elRef.nativeElement, 'value', this.appMaskValue + '/');
  //   // }
  // }
  

}
