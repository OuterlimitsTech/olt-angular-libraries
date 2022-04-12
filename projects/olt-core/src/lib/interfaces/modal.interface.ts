import { ModalTypeEnum } from '../enums';
import { IModalCustomCss } from './modal-custom-css.interface';

export interface IModal {
    title: string;
    message?: string;
    type?: ModalTypeEnum;
    customCss?: IModalCustomCss;

}


