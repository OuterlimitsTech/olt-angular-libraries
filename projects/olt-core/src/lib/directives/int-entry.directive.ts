import { ElementRef, Directive, HostListener, EventEmitter, Output } from '@angular/core';

// https://dev.to/dilika/restrict-angular-input-to-number-only-4o4k

@Directive({
    selector: 'input[oltIntEntry]',
    standalone: false
})
export class IntEntryDirective {

    @Output() valueChange = new EventEmitter()

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initalValue = this.elementRef.nativeElement.value;
        const newValue = initalValue.replace(/[^0-9]*/g, '');
        this.elementRef.nativeElement.value = newValue;
        this.valueChange.emit(newValue);
        if (initalValue !== this.elementRef.nativeElement.value) {
            event.stopPropagation();
        }
    }

}

/* Old Directive
const noop = () => { };

const clean = (value: string | null) => {
  return value?.toString().replace(/[^-?\d]/gm, '');
};

@Directive({
  selector: '[oltIntEntry]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IntEntryDirective),
      multi: true
    }
  ]
})
export class IntEntryDirective {
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
  writeValue(value: string | null): void {
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
*/