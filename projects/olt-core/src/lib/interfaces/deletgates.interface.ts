export type Action<T> = (item: T) => void;
export type ActionFunc<T> = () => T;
export type Func<T, TResult> = (item: T) => TResult;
