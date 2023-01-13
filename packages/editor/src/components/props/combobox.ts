import { DialogStart } from '@axonivy/inscription-core';

export interface ComboboxItem {
  value: string;
}

export interface DialogStartItem extends DialogStart, ComboboxItem {}

export namespace DialogStartItem {
  export function is(item: ComboboxItem): item is DialogStartItem {
    return (item as DialogStartItem).startName !== undefined;
  }
}
