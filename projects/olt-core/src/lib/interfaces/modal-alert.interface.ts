import { IModalAlertButton } from './modal-alert-button.interface';
import { IModal } from './modal.interface';

export interface IAlertModal extends IModal {
    message: string;
    button?: IModalAlertButton;
}


