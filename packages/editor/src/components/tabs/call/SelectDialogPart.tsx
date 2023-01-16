import { DialogStart } from '@axonivy/inscription-protocol';
import { CollapsiblePart, Combobox, ComboboxItem } from '../../widgets';
import { Message } from '../../props/message';

export interface DialogStartItem extends DialogStart, ComboboxItem {}

export namespace DialogStartItem {
  export function is(item: ComboboxItem): item is DialogStartItem {
    return (item as DialogStartItem).startName !== undefined;
  }
}

const SelectDialogPart = (props: {
  dialogStart: string;
  onChange: (change: string) => void;
  dialogStarts: DialogStartItem[];
  message?: Message;
}) => {
  const comboboxItem = (item: ComboboxItem) => {
    if (!DialogStartItem.is(item)) {
      return <></>;
    }
    return (
      <>
        <div>
          <span>➡️ {item.startName}</span>
        </div>
        <div>
          <span>🖥️ {item.dialogName} </span>
          <span className='comboboy-menu-entry-additional'>
            {item.packageName} - [{item.project}]
          </span>
        </div>
      </>
    );
  };

  const itemFilter = (item: ComboboxItem, input?: string) => {
    if (!input) {
      return true;
    }
    if (!DialogStartItem.is(item)) {
      return false;
    }
    var filter = input.toLowerCase();
    return (
      item.value.toLowerCase().includes(filter) ||
      item.packageName.toLowerCase().includes(filter) ||
      item.project.toLowerCase().includes(filter)
    );
  };

  return (
    <CollapsiblePart collapsibleLabel='User Dialog Start' defaultOpen={true}>
      <Combobox
        label='Dialog'
        items={props.dialogStarts}
        comboboxItem={comboboxItem}
        itemFilter={itemFilter}
        value={props.dialogStart}
        onChange={props.onChange}
        message={props.message}
      />
    </CollapsiblePart>
  );
};

export default SelectDialogPart;
