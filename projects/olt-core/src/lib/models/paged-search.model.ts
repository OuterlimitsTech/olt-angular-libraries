import { IPagedSearch } from '../interfaces/paged-search.interface';
import { Paged } from './paged.model';

export class PagedSearch<T, C> extends Paged<T> implements IPagedSearch<T, C> {
    key!: string;
    criteria!: C;

    public constructor(data?: any) {
        super(data);
        this.criteria = data?.criteria;
        this.key = data?.key;
    }
}
