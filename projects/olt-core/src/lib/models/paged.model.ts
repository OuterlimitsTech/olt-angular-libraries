import { IPaged } from '../interfaces';

export class Paged<T> implements IPaged<T> {
    public size = 1;
    public page = 10;
    public count = 0;
    public data!: Array<T>;

    public constructor(data?: any) {
        this.size = data?.size;
        this.page = data?.page;
        this.count = data?.count;
        this.data = data?.data;
    }
}
