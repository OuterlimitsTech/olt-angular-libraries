import { IModalAlertButton } from '../interfaces';

export class ModalAlertButton implements IModalAlertButton {
    public close = 'Ok';
    constructor(
        close?: string,
    ) {
        if (close != null) {
            this.close = close;
        }
    }
}

