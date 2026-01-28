import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// const guid = () => {
//   function s4() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   }
//   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
// };


@Component({
    selector: 'olt-test-date-entry, [formGroupName] olt-test-date-entry, [formGroup] olt-test-date-entry',
    templateUrl: './test-date-entry.component.html',
    styleUrls: ['./test-date-entry.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TestDateEntryComponent),
            multi: true
        }
    ],
    standalone: false
})
export class TestDateEntryComponent implements ControlValueAccessor  {
  // @Input() formControlName!: string;
  @Input() min: Date = new Date('0001-01-01T00:00:00Z');
  @Input() max: Date = new Date('9999-12-31T23:59:59Z');
  
  //public control!: FormControl;
  value: Date | any | null = null;  

  _value: Date | null = null;

  private configured = false;
  // private name: string = 'olt_date-fc_' + guid().substring(0, 8);

  disabled = false;
  touched = false;

  
  // ngAfterViewInit(): void {
  //   this.configureControl();
  // }

  // ngAfterContentChecked(): void {
  //   this.configureControl();
  // }

  configureControl(): void {
    if (this.configured) {
      return;
    }
    this.configured = true;
    // this.yesOption.nativeElement.id = `${this.name}_yes`;
    // this.yesOptionLbl.nativeElement.htmlFor = `${this.name}_yes`;
    // this.noOption.nativeElement.id = `${this.name}_no`;
    // this.noOptionLbl.nativeElement.htmlFor = `${this.name}_no`;
  }

  onChange: any = () => { };
  onTouched: any = () => { };


  writeValue(value: Date | null): void {
    console.log('date', value);
    // if(value != null && OltUtility.isDate(value)) {
    //   this.value = new Date(value.toDateString());
    // } else {
    //   this.value = value;
    // }
    
    this.value = value;

    // if (this.value === true) {
    //   this.yesOption.nativeElement.checked = false;
    // } else if (this.value === false) {
    //   this.noOption.nativeElement.checked = true;
    // } else {
    //   this.yesOption.nativeElement.checked = false;
    //   this.noOption.nativeElement.checked = false;
    // }
  }

  onChange2(event: any) {
    console.log(event);
    if (event != null) {
      this.onChange(new Date(event.toDateString()))
    } else {
      this.onChange( event);
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

  get firstError(): string | null {
    return null;
  }

}
