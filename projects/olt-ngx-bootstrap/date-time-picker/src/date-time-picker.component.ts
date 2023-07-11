import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'olt-ngx-date-time-picker, [formGroupName] olt-ngx-date-time-picker, [formGroup] olt-ngx-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    }
  ]  
})
export class DateTimePickerComponent implements ControlValueAccessor {
  @Input() min: Date = new Date('0001-01-01T00:00:00Z');
  @Input() max: Date = new Date('9999-12-31T23:59:59Z');
  
  value: Date | any | null = null;
  
  disabled = false;
  touched = false;

  onChange: any = () => { };
  onTouched: any = () => { };


  writeValue(value: Date | null): void {
    this.value = value;
  }

  dateChanged(event: any) {
    if (event != null) {
      this.onChange(new Date(event.toDateString()))
    } else {
      this.onChange(event);
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

}
