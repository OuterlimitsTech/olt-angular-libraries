import { ModalInputTypeEnum } from '../enums/modal-input-type.enum';
import { IModalActionButtons } from './modal-action-buttons.interface';
import { ModalTypeEnum } from '../enums/modal-type.enum';
import { IModalCustomCss } from './modal-custom-css.interface';
import { IModal } from './modal.interface';

export interface IInputModal extends IModal {
    inputType: ModalInputTypeEnum;
    inputLabel: string;
    title: string;
    buttons: IModalActionButtons;
    value?: string | null;
    message?: string;
    type?: ModalTypeEnum;    
    customCss?: IModalCustomCss;
}


