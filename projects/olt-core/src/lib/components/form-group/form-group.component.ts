import { Component, ElementRef, OnInit, Input, ViewChild, AfterViewInit, AfterContentChecked } from '@angular/core';
import { UntypedFormGroup, FormGroupName, ControlContainer, AbstractControl, FormGroupDirective } from '@angular/forms';

const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'olt-form-group, [formGroupName] olt-form-group, [formGroup] olt-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
  // changeDetection: ChangeDetectionStrategy.Default
})
export class FormGroupComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @Input()
  set validationLabel(value: string | null) {
    this._validationLabel = value;
  }
  get validationLabel(): string | null {
    if (this._validationLabel != null) {
      return this._validationLabel;
    }
    if (this.label && this.label.trim() && this.label !== this.controlLabelMissing) {
      return this.label;
    }
    return 'This Field';
  }

  @Input() srOnly = false;

  // tslint:disable-next-line:variable-name
  private _validationLabel: string | null = null;
  private controlLabelMissing = '<span class="control-label">Label Here</span> missing';
  private dynamicControl = false;
  private configured = false;
  private focused = false;
  @ViewChild('control', { static: true }) control!: ElementRef;
  @ViewChild('label', { static: true }) labelElementRef!: ElementRef;
  private name: string = 'formGroup_' + guid().substring(0, 8);

  constructor(private controlContainer: ControlContainer, private elRef: ElementRef) { }

  ngOnInit(): void {
    this.dynamicControl = this.inputElement == null;
  }

  ngAfterViewInit(): void {
    if (this.dynamicControl) {
      return;
    }
    this.configureControl();
  }

  ngAfterContentChecked(): void {
    if (this.dynamicControl && this.inputElement != null) {
      this.configureControl();
    }
  }


  configureControl(): void {
    if (this.configured) {
      return;
    }
    this.configured = true;
    const ele = this.inputElement;
    if (ele && this.controlId && ele.getAttribute('id') == null && ele.getAttribute('name') == null) {
      ele.id = this.controlId;
    }
    const label = this.labelElementRef.nativeElement as HTMLLabelElement;
    if (label && this.controlId && label.getAttribute('for') == null) {
      label.setAttribute('for', this.controlId);
    }
  }

  get inputElement(): Element | null {
    const span = this.control.nativeElement as HTMLSpanElement;
    let ele = span.firstElementChild;
    if (ele == null) {
      ele = this.elRef.nativeElement.querySelector('.form-control');
    }
    if (ele == null) {
      ele = this.elRef.nativeElement.querySelector('input');
    }
    return ele;
  }

  get controlId(): string {
    const ele = this.inputElement;
    if (ele) {
      const id = ele.getAttribute('id');
      if (id) {
        return id;
      }
      const name = ele.getAttribute('name');
      if (name) {
        return name;
      }

      // This causes problems inside a Form Array;
      // const controlName = span.firstElementChild.getAttribute('formControlName');
      // if (controlName) {
      //   return controlName;
      // }
    }

    return this.name;
  }

  get formControlName(): string {
    const span = this.control.nativeElement as HTMLSpanElement;
    const controlName = span?.firstElementChild?.getAttribute('formControlName');
    if (controlName == null) {
      return this.elRef.nativeElement.querySelector('input').getAttribute('formControlName');
    }
    return controlName;
  }

  get formGroup(): UntypedFormGroup | AbstractControl | null {
    if (this.controlContainer instanceof FormGroupName) {
      return (this.controlContainer as FormGroupName).control;
    }

    if (this.controlContainer instanceof UntypedFormGroup) {
      return this.controlContainer as UntypedFormGroup;
    }

    if (this.controlContainer instanceof FormGroupDirective) {
      return (this.controlContainer as FormGroupDirective).control;
    }

    return this.controlContainer.control;
  }

  get formControl(): AbstractControl | null {
    const fg = this.formGroup;
    if (fg != null) {
      return fg.get(this.formControlName);
    }
    return null;
  }

  get isValid(): boolean {
    return this.formControl?.dirty === true && this.formControl?.valid === true;
  }

  get isTouched(): boolean {
    return this.formControl?.touched === true;
  }

  get isRequired(): boolean {
    const errors = this.formControl?.errors;
    if (errors != null) {
      // tslint:disable-next-line:no-string-literal
      return typeof errors['required'] !== 'undefined';
    }
    return false;
  }

  get showRequiredIndicator(): boolean {
    if (this.isRequired) {
      if (this.formControl?.valid && this.formControl?.value != null) {
        return false;
      }
      return true;
    }
    return false;
  }

  get showSuccessIndicator(): boolean {
    if (this.formControl?.valid && this.formControl?.value != null) {
      return true;
    }
    return (this.formControl?.touched === true || this.formControl?.dirty === true) && this.formControl?.valid === true;
  }

  get showErrorIndicator(): boolean {
    return (this.formControl?.touched === true || this.formControl?.dirty === true) && this.formControl?.invalid === true;
  }

  get isFocused(): boolean {
    return this.focused;
  }

  set isFocused(focused: boolean) {
    this.focused = focused;
  }



  get label(): string {
    const label = this.elRef.nativeElement.querySelector('.control-label');
    return (label && label.textContent && label.textContent.trim()) || this.controlLabelMissing;
  }

  public getFirstError(): string | null {
    const errors = this.formControl?.errors;
    let first: string | null = null;
    for (const err in errors) {
      if (errors.hasOwnProperty(err) && errors[err]) {
        first = err;
        break;
      }
    }

    if (first != null) {
      const displayLabel = this.validationLabel;
      let msg = 'invalid';

      switch (first) {
        case 'minlength':
          msg = 'too short';
          break;
        case 'maxlength':
          msg = 'too long';
          break;
        case 'required':
          msg = 'required';
          break;
        case 'min':
          msg = 'too low';
          break;
        case 'max':
          msg = 'too high';
          break;
        case 'email':
          msg = 'invalid';
          break;
        default:
          if (errors != null && errors[first] && errors[first]?.message != null) {
            msg = errors[first]?.message;
          }
          // if (this.formControl.errors[first] && this.formControl.errors[first].message) {
          //   msg = this.formControl.errors[first].message;
          // }
          break;
      }
      return `${displayLabel} is ${msg}.`;
    }

    return null;
  }

}
