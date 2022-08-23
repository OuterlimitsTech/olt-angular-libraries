import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { InputModal, InputModalResponse } from '../../models';

@Component({
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent extends BaseModalComponent implements OnInit {
  entryForm: UntypedFormGroup = this.createForm();
  settings!: InputModal;
  response = new InputModalResponse();
  dateValue!: Date;
  timeValue!: Date;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: UntypedFormBuilder
  ) { super(); }

  ngOnInit(): void { }

  public createForm(): UntypedFormGroup {
    return this.fb.group({
      value: [this.settings?.value, [Validators.required]]
    });
  }


  save(): void {
    if (this.entryForm.invalid) {
      this.entryForm.markAsDirty();
      this.entryForm.markAsTouched();
      this.entryForm.markAllAsTouched();
      return;
    }

    this.response.result = true;
    this.response.value = this.entryForm.value;
    this.bsModalRef.hide();

  }



}
