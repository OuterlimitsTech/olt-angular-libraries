export type Action<T> = (item: T) => void;
export type Func<T, TResult> = (item: T) => TResult;
