import { ModalTypeEnum } from '../enums';
import { ModalCustomCss } from './modal-custom-css.model';
import { IModalAlertButton, IModalCustomCss, IAlertModal } from '../interfaces';
import { ModalAlertButton } from './modal-alert-button.model';

export class AlertModal implements IAlertModal {

    constructor(
        public message: string,
        public title: string,
        public type?: ModalTypeEnum,
        public button?: IModalAlertButton,
        public customCss?: IModalCustomCss
    ) {
        this.type = this.type || ModalTypeEnum.Primary;
        this.button = this.button || new ModalAlertButton();
        this.customCss = this.customCss || new ModalCustomCss();
    }
}

