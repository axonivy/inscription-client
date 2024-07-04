import type { ComboboxItem } from '../../../widgets';
import { Combobox, IvyIcon } from '../../../widgets';
import type { IvyIcons } from '@axonivy/ui-icons';

export type ClassifiedItem = { label?: string; info?: string } & ComboboxItem;

type ClassificatioComboboxProps = {
  value: string;
  onChange: (change: string) => void;
  data: ClassifiedItem[];
  icon?: IvyIcons;
  withBrowser?: boolean;
};

const ClassificationCombobox = ({ value, onChange, data, icon, withBrowser }: ClassificatioComboboxProps) => {
  const comboboxItem = (item: ClassifiedItem) => {
    return (
      <>
        <div>
          {icon && <IvyIcon icon={icon} />}
          <span>{item.label ? item.label : item.value}</span>
        </div>
        {item.info && <div className='combobox-menu-entry-additional'>{` - ${item.info}`}</div>}
      </>
    );
  };

  return (
    <Combobox
      value={value}
      onChange={onChange}
      items={data}
      comboboxItem={comboboxItem}
      {...(withBrowser
        ? {
            browserTypes: ['attr'],
            macro: true
          }
        : {})}
    />
  );
};

export default ClassificationCombobox;
