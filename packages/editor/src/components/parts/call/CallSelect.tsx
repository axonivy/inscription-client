import { Combobox, ComboboxItem, FieldsetInputProps, IvyIcon } from '../../widgets';
import { IvyIcons } from '@axonivy/editor-icons';
import { CallableStart } from '@axonivy/inscription-protocol';
import { useMemo } from 'react';

export type CallableStartItem = CallableStart & ComboboxItem;

type CallSelectProps = {
  start: string;
  onChange: (change: string) => void;
  starts: CallableStart[];
  startIcon: IvyIcons;
  comboboxInputProps?: FieldsetInputProps;
};

const CallSelect = ({ start, onChange, starts, startIcon, comboboxInputProps }: CallSelectProps) => {
  const items = useMemo<CallableStartItem[]>(
    () =>
      starts.map(start => {
        return { ...start, value: start.id };
      }),
    [starts]
  );

  const itemFilter = (item: CallableStartItem, input?: string) => {
    if (!input) {
      return true;
    }
    var filter = input.toLowerCase();
    return (
      item.value.toLowerCase().includes(filter) ||
      item.packageName.toLowerCase().includes(filter) ||
      item.project.toLowerCase().includes(filter)
    );
  };

  const comboboxItem = (item: CallableStartItem) => {
    return (
      <>
        <div>
          <IvyIcon icon={startIcon} />
          <span style={item.deprecated ? { textDecoration: 'line-through' } : {}}>{item.startName}</span>
        </div>
        <div>
          <span className='combobox-menu-entry-additional'>{`${item.project} > ${item.packageName}.${item.process}`}</span>
        </div>
      </>
    );
  };

  const deprecatedSelection = useMemo(() => starts.find(s => s.id === start)?.deprecated, [start, starts]);

  return (
    <Combobox
      items={items}
      comboboxItem={comboboxItem}
      itemFilter={itemFilter}
      value={start}
      onChange={onChange}
      {...comboboxInputProps}
      style={deprecatedSelection ? { textDecoration: 'line-through' } : {}}
    />
  );
};

export default CallSelect;
