import { EventCodeMeta } from '@axonivy/inscription-protocol';
import { Combobox, ComboboxItem, FieldsetInputProps, IvyIcon } from '../../../widgets';
import { IvyIcons } from '@axonivy/editor-icons';

export type EventCodeItem = Pick<EventCodeMeta, 'eventCode'> & { info?: string } & ComboboxItem;

type EventCodeSelectProps = {
  eventCode: string;
  onChange: (change: string) => void;
  eventCodes: EventCodeItem[];
  eventIcon: IvyIcons;
  comboboxInputProps?: FieldsetInputProps;
  withBrowser?: boolean;
};

const EventCodeSelect = ({ eventCode, onChange, eventCodes, eventIcon, comboboxInputProps, withBrowser }: EventCodeSelectProps) => {
  const comboboxItem = (item: EventCodeItem) => {
    return (
      <>
        <div>
          <IvyIcon icon={eventIcon} />
          {item.eventCode}
        </div>
        {item.info && (
          <div>
            <span className='combobox-menu-entry-additional'>{item.info}</span>
          </div>
        )}
      </>
    );
  };

  return (
    <Combobox
      value={eventCode}
      onChange={onChange}
      items={eventCodes}
      comboboxItem={comboboxItem}
      {...comboboxInputProps}
      {...(withBrowser
        ? {
            browserTypes: ['attr'],
            macro: true
          }
        : {})}
    />
  );
};

export default EventCodeSelect;
