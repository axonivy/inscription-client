import { Combobox, ComboboxItem, FieldsetInputProps, IvyIcon } from '../../widgets';
import { IvyIcons } from '@axonivy/editor-icons';
import { CallableStart } from '@axonivy/inscription-protocol';
import { useMemo } from 'react';

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

type CallSelectProps = {
  start: string;
  onChange: (change: string) => void;
  starts: CallableStartItem[];
  startIcon: IvyIcons;
  processIcon: IvyIcons;
  comboboxInputProps?: FieldsetInputProps;
};

const CallSelect = ({ start, onChange, starts, startIcon, processIcon, comboboxInputProps }: CallSelectProps) => {
  const comboboxItem = (item: ComboboxItem) => {
    if (!CallableStartItem.is(item)) {
      return <></>;
    }
    return (
      <>
        <div>
          <IvyIcon icon={startIcon} />
          <span style={item.deprecated ? { textDecoration: 'line-through' } : {}}>{item.startName}</span>
        </div>
        <div>
          <IvyIcon icon={processIcon} />
          <span>{item.process}</span>
          <span className='combobox-menu-entry-additional'>
            {item.packageName} - [{item.project}]
          </span>
        </div>
      </>
    );
  };

  const deprecatedSelection = useMemo(() => starts.find(s => s.id === start)?.deprecated, [start, starts]);

  return (
    <Combobox
      items={starts}
      comboboxItem={comboboxItem}
      itemFilter={CallableStartItem.itemFilter}
      value={start}
      onChange={onChange}
      {...comboboxInputProps}
      style={deprecatedSelection ? { textDecoration: 'line-through' } : {}}
    />
  );
};

export default CallSelect;
