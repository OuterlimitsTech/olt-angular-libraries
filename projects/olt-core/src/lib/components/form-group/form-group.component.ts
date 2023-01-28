import { Component, ElementRef, OnInit, Input, ViewChild, AfterViewInit, AfterContentChecked } from '@angular/core';
import { UntypedFormGroup, FormGroupName, ControlContainer, AbstractControl, FormGroupDirective } from '@angular/forms';
import { IFormGroupComponentValidationState } from '../../interfaces/form-group-validation-state-component.interface';
import { IFormGroupValidationState } from '../../interfaces/form-group-validation-state.interface';
import { OltUtility } from './../../utilities/utility';

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
export class FormGroupComponent implements OnInit, AfterViewInit, AfterContentChecked, IFormGroupComponentValidationState {
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

  @Input() cssClass = 'form-group';
  @Input() srOnly = false;
  @Input() hideHelpBlock = false;

  // tslint:disable-next-line:variable-name
  private _validationLabel: string | null = null;
  private controlLabelMissing = '<span class="control-label">Label Here</span> missing';
  private dynamicControl = false;
  private configured = false;
  private name: string = 'formGroup_' + guid().substring(0, 8);

  @ViewChild('control', { static: true }) control!: ElementRef;
  @ViewChild('helpBlock', { static: true }) helpBlock!: ElementRef;

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

    // const label = this.labelElementRef.nativeElement as HTMLLabelElement;
    // if (label && this.controlId && label.getAttribute('for') == null) {
    //   label.setAttribute('for', this.controlId);
    // }
  }

  private get inputElement(): Element | null {
    const spanElement = this.control.nativeElement as HTMLSpanElement;
    let ele = spanElement?.firstElementChild;
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

  private get formControlName(): string {
    const controlName = this.inputElement?.getAttribute('formControlName');
    if (controlName == null) {
      return this.elRef.nativeElement.querySelector('input')?.getAttribute('formControlName');
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

  get isRequired(): boolean {
    const errors = this.formControl?.errors;
    if (errors != null) {
      // tslint:disable-next-line:no-string-literal
      return typeof errors['required'] !== 'undefined';
    }
    return false;
  }

  get showRequired(): boolean {
    if (this.isRequired) {
      if (this.formControl?.valid && this.formControl?.value != null) {
        return false;
      }
      return true;
    }
    return false;
  }

  get showSuccess(): boolean {
    if (this.formControl?.dirty && this.formControl?.valid && this.formControl?.value != null) {
      return true;
    }
    return false;
  }

  get showError(): boolean {
    return (this.formControl?.touched === true || this.formControl?.dirty === true) && this.formControl?.invalid === true;
  }

  get validationState(): IFormGroupValidationState {
    return {
      required: this.isRequired,
      invalid: this.formControl?.invalid === true,
      dirty: this.formControl?.dirty === true,
      touched: this.formControl?.touched === true,
      hasValue: this.formControl?.value != null
    }
  }

  get label(): string {
    const label = this.elRef.nativeElement.querySelector('.control-label');
    return (label && label.textContent && label.textContent.trim()) || this.controlLabelMissing;
  }


  get firstError(): string | null {
    const errors = OltUtility.getFormValidationErrors(this.formControl, this.validationLabel);
    return errors?.length > 0 ? errors[0].message : null;
  }

}
