export interface IPaged<T> {
    count: number;
    page: number;
    size: number;
    data: Array<T>;
}
