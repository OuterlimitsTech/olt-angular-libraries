import { FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OltUtility, InputModal, InputModalResponse } from '@olt-core';


@Component({
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent extends BaseModalComponent implements OnInit {
  entryForm: FormGroup = this.createForm();
  settings!: InputModal;
  response = new InputModalResponse();
  dateValue!: Date;
  timeValue!: Date;

  constructor(
    public bsModalRef: BsModalRef,
  ) { super(); }

  ngOnInit(): void { }

  public createForm(): FormGroup<any> {
    return new FormGroup<any>({
      value: [this.settings?.value, [Validators.required]]
    });
  }


  save(): void {
    if (this.entryForm.invalid) {
      OltUtility.triggerValidators(this.entryForm);
      return;
    }

    this.response.result = true;
    this.response.value = this.entryForm.value;
    this.bsModalRef.hide();

  }



}
