import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModal } from '@outerlimitstech/ngx-app-core';
import { BaseModalComponent } from '../base-modal.component';

@Component({
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent extends BaseModalComponent implements OnInit {
  settings!: AlertModal;
  result = false;

  constructor(
    public bsModalRef: BsModalRef
  ) { super(); }

  ngOnInit(): void { }






}
