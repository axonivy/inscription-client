import type { ComboboxItem, FieldsetInputProps } from '../../../widgets';
import { Combobox, IvyIcon } from '../../../widgets';
import type { IvyIcons } from '@axonivy/editor-icons';

export type ClassifiedItem = { label?: string; info?: string } & ComboboxItem;

type ClassificatioComboboxProps = {
  value: string;
  onChange: (change: string) => void;
  data: ClassifiedItem[];
  icon?: IvyIcons;
  comboboxInputProps?: FieldsetInputProps;
  withBrowser?: boolean;
};

const ClassificationCombobox = ({ value, onChange, data, icon, comboboxInputProps, withBrowser }: ClassificatioComboboxProps) => {
  const comboboxItem = (item: ClassifiedItem) => {
    return (
      <>
        <div>
          {icon && <IvyIcon icon={icon} />}
          {item.label ? item.label : item.value}
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
      value={value}
      onChange={onChange}
      items={data}
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

export default ClassificationCombobox;
