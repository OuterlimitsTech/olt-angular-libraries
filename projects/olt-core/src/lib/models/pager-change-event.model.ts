import { IPagerChangeEvent } from '../interfaces/pager-change-event.interface';

export class PagerChangeEvent implements IPagerChangeEvent {
    page: number;
    size: number;

    constructor(page?: number, size?: number) {
        this.page = page || 1;
        this.size = size || 10;
    }
}
