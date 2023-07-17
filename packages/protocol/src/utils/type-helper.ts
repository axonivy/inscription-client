export type ValuesAsUnion<T> = {
  [V in keyof T]: T[V];
}[keyof T];

export type ValuesAsUnionDeep<T> = {
  [V in keyof T]: T[V] extends object ? ValuesAsUnionDeep<T[V]> : T[V];
}[keyof T];

declare const brand: unique symbol;

export type Brand<T, TBrand> = T & { [brand]: TBrand };
