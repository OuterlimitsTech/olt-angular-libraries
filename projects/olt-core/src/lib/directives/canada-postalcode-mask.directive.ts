import { OltUtility } from './../utilities/utility';
import { Directive, forwardRef, Input, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


const noop = () => { };

const masks = ['1', '11', '111', '111 1', '111 11', '111 111'];

const clean = (value: string | null): string | null | undefined => {
  return value?.toString()?.replace(' ', '')?.replace(/[^a-z0-9]/gi, '')?.toUpperCase();
};

@Directive({
  selector: '[oltCanadaPostalcodeMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CanadaPostalcodeMaskDirective),
      multi: true
    }
  ]
})
export class CanadaPostalcodeMaskDirective {
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Input() public valueType: 'clean' | 'full' = 'clean';
  @Input() public showMask = true;

  public disabled = false;
  // tslint:disable-next-line: variable-name
  private _value!: string | null;
  private oldValue = '';

  constructor(private input: ElementRef) { }

  updateInputView(): void {
    const input = this.input.nativeElement;
    const cursorPosition = input.selectionStart;
    const value = this._value;
    const valueWithCursor = value?.substring(0, cursorPosition) + '^' + value?.substring(cursorPosition);

    const formatted = OltUtility.cursorPositionFormatMask(valueWithCursor, masks, clean);

    if (!formatted) {
      input.value = this.oldValue;
      return;
    }

    const newValue = formatted.formatted;
    // tslint:disable-next-line:triple-equals
    if (newValue != input.value) {
      input.value = newValue;
      input.setSelectionRange(formatted.cursorPosition, formatted.cursorPosition);
    }
    this.oldValue = newValue;
    this.emitValue(this.oldValue);
  }

  emitValue(v: string | null): void {
    let value;
    switch (this.valueType) {
      case 'clean':
        value = v?.replace('-', '');
        break;
      case 'full':
        value = v;
        break;
    }
    this.onChangeCallback(value);
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
