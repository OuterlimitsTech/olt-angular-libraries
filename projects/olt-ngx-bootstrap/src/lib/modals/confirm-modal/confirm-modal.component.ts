import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmModal, ModalTypeEnum } from '@outerlimitstech/ngx-app-core';

@Component({
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  settings!: ConfirmModal;
  result = false;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void { }

  get headerCss(): string {
    const defaultCss = 'bg-primary text-white';

    switch (this.settings?.type) {
      case ModalTypeEnum.Custom:
        if (this.settings?.customCss != null && this.settings?.customCss?.titleCss != null) {
          return this.settings?.customCss?.titleCss;
        }
        return defaultCss;

      case ModalTypeEnum.Danger:
        return 'bg-danger text-white';

      case ModalTypeEnum.Warning:
        return 'bg-warning text-white';
    }

    return defaultCss;
  }

  get primaryButtonCss(): string {
    const defaultCss = 'btn btn-primary';

    switch (this.settings?.type) {
      case ModalTypeEnum.Custom:
        if (this.settings?.customCss != null && this.settings?.customCss?.primaryButtonCss != null) {
          return this.settings?.customCss?.primaryButtonCss;
        }
        return defaultCss;

      case ModalTypeEnum.Danger:
        return 'btn btn-danger';

      case ModalTypeEnum.Warning:
        return 'btn btn-warning';
    }

    return defaultCss;
  }

  get closeButtonCss(): string {
    const defaultCss = 'btn btn-secondary';

    switch (this.settings?.type) {
      case ModalTypeEnum.Custom:
        if (this.settings?.customCss != null && this.settings?.customCss?.cancelButtonCss != null) {
          return this.settings?.customCss?.cancelButtonCss;
        }
        return defaultCss;
    }

    return defaultCss;
  }


  confirm(): void {
    this.result = true;
    this.bsModalRef.hide();
  }


}
