import { IModalActionButtons } from '../interfaces';

export class ModalActionButtons implements IModalActionButtons {
    public primary = 'Save';
    public cancel = 'Cancel';
    constructor(
        primary?: string,
        cancel?: string
    ) {
        if (primary != null) {
            this.primary = primary;
        }
        if (cancel != null) {
            this.cancel = cancel;
        }
    }
}

