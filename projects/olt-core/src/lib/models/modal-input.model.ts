import { ModalTypeEnum } from '../enums';
import { ModalCustomCss } from './modal-custom-css.model';
import { ModalActionButtons } from './modal-action-buttons.model';
import { ModalInputTypeEnum } from '../enums/modal-input-type.enum';
import { IInputModal } from '../interfaces/modal-input.interface';
import { IModalCustomCss, IModalActionButtons } from '../interfaces';

export class InputModal implements IInputModal {
    public inputType: ModalInputTypeEnum;
    public inputLabel: string;
    public title: string;
    public buttons: IModalActionButtons;
    public type?: ModalTypeEnum;
    public customCss?: IModalCustomCss;
    public message?: string;
    public value?: any;

    constructor(
        inputLabel: string,
        title: string,
        buttons: ModalActionButtons,
        inputType?: ModalInputTypeEnum,
        value?: any,
        type?: ModalTypeEnum,
        customCss?: ModalCustomCss,
        message?: string
    ) {
        this.title = title;
        this.message = message;
        this.value = value;
        this.type = type || ModalTypeEnum.Primary;
        this.customCss = customCss || new ModalCustomCss();
        this.inputLabel = inputLabel;
        this.inputType = inputType || ModalInputTypeEnum.Text;
        this.buttons = buttons || new ModalActionButtons('Save', 'Cancel');
    }
}

