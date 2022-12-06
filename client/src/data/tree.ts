export interface TreeData<TData> {
  children: TData[];
}

export namespace TreeData {
  export function is<TData>(object: any): object is TreeData<TData> {
    return 'children' in object;
  }
}
