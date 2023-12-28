export type Integer<T extends number> = `${T}` extends `${string}.${string}` ? never : T;
export type Positive<T extends number> = `${T}` extends `-${string}` ? never : T;
export type PositiveInteger<T extends number> = Positive<Integer<T>>;