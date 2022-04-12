import { IModalCustomCss } from '../interfaces';

export class ModalCustomCss implements IModalCustomCss {
    public titleCss: string;
    public primaryButtonCss: string;
    public cancelButtonCss: string;

    constructor(
        titleCss?: string,
        primaryButtonCss?: string,
        cancelButtonCss?: string,
    ) {
        this.titleCss = titleCss || '';
        this.primaryButtonCss = primaryButtonCss || '';
        this.cancelButtonCss = cancelButtonCss || '';
    }
}

