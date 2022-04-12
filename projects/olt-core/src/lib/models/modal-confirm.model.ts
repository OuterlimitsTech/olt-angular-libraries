import { ModalTypeEnum } from '../enums';
import { ModalCustomCss } from './modal-custom-css.model';
import { ModalActionButtons } from './modal-action-buttons.model';
import { IModalActionButtons, IModalCustomCss, IConfirmModal } from '../interfaces';

export class ConfirmModal implements IConfirmModal {

    constructor(
        public message: string,
        public title: string,
        public type?: ModalTypeEnum,
        public buttons?: IModalActionButtons,
        public customCss?: IModalCustomCss
    ) {
        this.type = this.type || ModalTypeEnum.Primary;
        this.buttons = this.buttons || new ModalActionButtons('Yes', 'No');
        this.customCss = this.customCss || new ModalCustomCss();
    }
}

