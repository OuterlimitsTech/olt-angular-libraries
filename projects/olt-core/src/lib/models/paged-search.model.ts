import { Paged } from './paged.model';

export class PagedSearch<T, C> extends Paged<T> {
    key!: string;
    criteria!: C;

    public constructor(data?: any) {
        super(data);
        this.criteria = data?.criteria;
        this.key = data?.key;
    }
}
