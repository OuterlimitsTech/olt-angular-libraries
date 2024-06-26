import { Component, Input, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { OltUtility } from '@outerlimitstech/ngx-app-core';

@Component({
  selector: 'olt-ngx-datetime-picker, [formGroupName] olt-ngx-datetime-picker, [formGroup] olt-ngx-datetime-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    }     
  ]  
})
export class DateTimePickerComponent implements ControlValueAccessor, Validator  {
  @Input() placeholder: string | null = "mm/dd/yyyy";
  @Input() minDate: Date = new Date('0001-01-01T00:00:00Z');
  @Input() maxDate: Date = new Date('9999-12-31T23:59:59Z'); 

  
  dateValue: Date | any | null = null;  
  timeValue: Date | any | null = null;  
  _timeValue: Date | any | null = null;  

  disabled = false;

  onChange: any = () => { };
  onTouched: any = () => { };
  onValidatorChange?: any = () => { };


  writeValue(value: Date | null): void {    
    value = value ?? null; //Make sure it's not undefined
    // console.log('writeValue', value);
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
    // console.log('validate',  this.dateValue, control);


    if (this.dateValue != null) {
      const maxTime = this.maxDate?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      const minTime = this.minDate?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

      
      if (this.dateValue < this.minDate) {

        if (new Date(this.dateValue.toLocaleDateString()) == new Date(this.minDate.toLocaleDateString())){
          return { minDateTime : { valid: false, message: `Time is before ${minTime}` } };
        } else{
          return { minDateTime : { valid: false, message: `Date/Time is before ${this.minDate?.toLocaleDateString()} ${minTime}` } };
        }      

      } else if (this.dateValue > this.maxDate) {

        if (new Date(this.dateValue.toLocaleDateString()) == new Date(this.maxDate.toLocaleDateString())){
          return { minDateTime : { valid: false, message: `Time is after ${maxTime}` } };
        } else{
          return { minDateTime : { valid: false, message: `Date/Time is after ${this.maxDate?.toLocaleDateString()} ${maxTime}` } };
        }    

      }
    }
    

    const invalidDate = this.dateValue == null && this.timeValue != null;
    const invalidTime = this.dateValue != null && this.timeValue == null;

    if (invalidDate) {
      return { invalidDate: { valid: false, message: 'Invalid Date' } };
    } 
    
    if (invalidTime) {
      return { invalidTime: { valid: false, message: 'Invalid Time' } };    
    }
    
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
