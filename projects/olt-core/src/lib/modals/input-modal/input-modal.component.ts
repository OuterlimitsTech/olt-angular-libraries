import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { InputModal, InputModalResponse } from '../../models';
import { ModalInputTypeEnum } from '../../enums';
import { OltUtility } from '../../utilities';

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
    private fb: FormBuilder
  ) { super(); }

  ngOnInit(): void { }

  public createForm(): FormGroup {
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
