import { Combobox, ComboboxItem, IvyIcon } from '../../widgets';
import { Message } from '../../props/message';
import { IvyIcons } from '@axonivy/editor-icons';
import { CallableStart } from '@axonivy/inscription-protocol';

export interface CallableStartItem extends CallableStart, ComboboxItem {}

export namespace CallableStartItem {
  export function is(item: ComboboxItem): item is CallableStartItem {
    return (item as CallableStartItem).startName !== undefined;
  }

  export function map(starts: CallableStart[]): CallableStartItem[] {
    return starts.map(start => {
      return { ...start, value: start.id };
    });
  }

  export function itemFilter(item: ComboboxItem, input?: string) {
    if (!input) {
      return true;
    }
    if (!CallableStartItem.is(item)) {
      return false;
    }
    var filter = input.toLowerCase();
    return (
      item.value.toLowerCase().includes(filter) ||
      item.packageName.toLowerCase().includes(filter) ||
      item.project.toLowerCase().includes(filter)
    );
  }
}

const CallSelect = (props: {
  start: string;
  onChange: (change: string) => void;
  starts: CallableStartItem[];
  label: string;
  startIcon: IvyIcons;
  processIcon: IvyIcons;
  message?: Message;
}) => {
  const comboboxItem = (item: ComboboxItem) => {
    if (!CallableStartItem.is(item)) {
      return <></>;
    }
    return (
      <>
        <div>
          <IvyIcon icon={props.startIcon} />
          <span>{item.startName}</span>
        </div>
        <div>
          <IvyIcon icon={props.processIcon} />
          <span>{item.process}</span>
          <span className='combobox-menu-entry-additional'>
            {item.packageName} - [{item.project}]
          </span>
        </div>
      </>
    );
  };

  return (
    <Combobox
      label={props.label}
      items={props.starts}
      comboboxItem={comboboxItem}
      itemFilter={CallableStartItem.itemFilter}
      value={props.start}
      onChange={props.onChange}
      message={props.message}
    />
  );
};

export default CallSelect;
