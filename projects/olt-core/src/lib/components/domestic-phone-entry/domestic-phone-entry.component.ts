import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { OltBaseFormGroupComponent } from '../../views/base-view.formGroup.component';

@Component({
  selector: 'olt-domestic-phone-entry, [formGroupName] olt-domestic-phone-entry, [formGroup] olt-domestic-phone-entry',
  templateUrl: './domestic-phone-entry.component.html',
  styleUrls: ['./domestic-phone-entry.component.scss']
})
export class DomesticPhoneEntryComponent extends OltBaseFormGroupComponent {
  @Input() label = 'Phone';
  @Input() extVisible = true;

  // @ViewChild('control', { static: false }) control: ElementRef;
  @ViewChild('control') control!: ElementRef;

  constructor() { super(); }
}
