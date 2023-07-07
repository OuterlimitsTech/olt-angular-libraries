import { Component, OnInit } from '@angular/core';
import { IModal, ModalTypeEnum } from '@olt-core';

@Component({
    template: ''
})
export class BaseModalComponent implements OnInit {
    settings!: IModal;

    constructor() { }

    ngOnInit(): void {
    }

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

            case ModalTypeEnum.Success:
                return 'bg-success text-white';

            case ModalTypeEnum.Info:
                return 'bg-info text-white';

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

            case ModalTypeEnum.Success:
                return 'btn btn-success';

            case ModalTypeEnum.Info:
                return 'btn btn-info';
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


}
