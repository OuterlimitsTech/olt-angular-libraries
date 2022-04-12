import { ModalTypeEnum } from '../enums';
import { IModalCustomCss } from './modal-custom-css.interface';
import { IModalAlertButton } from './modal-alert-button.interface';
import { IModal } from './modal.interface';

export interface IAlertModal extends IModal {
    message: string;
    button?: IModalAlertButton;
}


