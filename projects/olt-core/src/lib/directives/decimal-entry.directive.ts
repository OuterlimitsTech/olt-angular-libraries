import { Directive, forwardRef, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OltUtility } from '../utilities/utility';

const noop = () => { };

const clean = (value: string | null) => {
  return value?.toString().replace(/[^-?\d.]/gm, '');
};


@Directive({
  selector: '[oltDecimalEntry]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DecimalEntryDirective),
      multi: true
    }
  ]
})
export class DecimalEntryDirective {
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  public disabled = false;
  // tslint:disable-next-line: variable-name
  private _value!: string | null;
  private oldValue = '';

  constructor(private input: ElementRef) { }

  updateInputView(): void {
    const input = this.input.nativeElement;
    const value = this._value;

    const intOnly = clean(value) || '';

    // tslint:disable-next-line:triple-equals
    if (intOnly != input.value) {
      input.value = intOnly;
    }
    this.oldValue = intOnly;
    this.emitValue(this.oldValue);
  }

  emitValue(value: string | null): void {
    if (OltUtility.isNumber(value)) {
      this.onChangeCallback(value);
    }
  }

  @HostListener('input')
  onInput(): void {
    this._value = this.input.nativeElement.value;
    this.updateInputView();
  }

  set value(v: string | null) {
    const value = v ? v : '';
    this._value = value;
    this.updateInputView();
  }
  // From ControlValueAccessor interface
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    if (this.onTouchedCallback != null) { }  //prevent tsconfig compile error for unused variable
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
