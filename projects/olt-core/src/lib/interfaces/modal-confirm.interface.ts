import { ModalTypeEnum } from '../enums';
import { IModalCustomCss } from './modal-custom-css.interface';
import { IModalActionButtons } from './modal-action-buttons.interface';

export interface IConfirmModal {
    title: string;
    message: string;
    type?: ModalTypeEnum;
    buttons?: IModalActionButtons;
    customCss?: IModalCustomCss;

}


