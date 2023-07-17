import { IPaged } from "./paged.interface";

export interface IPagedSearch<T, C> extends IPaged<T> {
    key: string;
    criteria: C;
}

