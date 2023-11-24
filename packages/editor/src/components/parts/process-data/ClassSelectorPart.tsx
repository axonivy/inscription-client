import type { DataClass } from '@axonivy/inscription-protocol';
import type { ComboboxItem, FieldsetInputProps } from '../../widgets/index.js';
import { Combobox, IvyIcon } from '../../widgets/index.js';
import { IvyIcons } from '@axonivy/editor-icons';

export type DataClassItem = Pick<DataClass, 'name' | 'packageName' | 'path'> & ComboboxItem;

type DataClassSelectorProps = {
  dataClass: string;
  onChange: (change: string) => void;
  dataClasses: DataClassItem[];
  comboboxInputProps?: FieldsetInputProps;
};

const DataClassSelector = ({ dataClass, onChange, dataClasses, comboboxInputProps }: DataClassSelectorProps) => {
  const comboboxItem = (item: DataClassItem) => {
    return (
      <>
        <div>
          <IvyIcon icon={IvyIcons.DataClass} />
          {item.name}
        </div>
        {item.packageName && (
          <div>
            <span className='combobox-menu-entry-additional'>{item.packageName}</span>
            <span className='combobox-menu-entry-additional'> - </span>
            <span className='combobox-menu-entry-additional'>{item.path}</span>
          </div>
        )}
      </>
    );
  };

  return <Combobox value={dataClass} onChange={onChange} items={dataClasses} comboboxItem={comboboxItem} {...comboboxInputProps} />;
};

export default DataClassSelector;
