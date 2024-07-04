import type { DataClass } from '@axonivy/inscription-protocol';
import type { ComboboxItem } from '../../widgets';
import { Combobox, IvyIcon } from '../../widgets';
import { IvyIcons } from '@axonivy/ui-icons';

export type DataClassItem = Pick<DataClass, 'name' | 'packageName' | 'path'> & ComboboxItem;

type DataClassSelectorProps = {
  dataClass: string;
  onChange: (change: string) => void;
  dataClasses: DataClassItem[];
};

const DataClassSelector = ({ dataClass, onChange, dataClasses }: DataClassSelectorProps) => {
  const comboboxItem = (item: DataClassItem) => {
    return (
      <>
        <div>
          <IvyIcon icon={IvyIcons.DataClass} />
          {item.name}
        </div>
        {item.packageName && <div className='combobox-menu-entry-additional'>{`${item.packageName} - ${item.path}`}</div>}
      </>
    );
  };

  return <Combobox value={dataClass} onChange={onChange} items={dataClasses} comboboxItem={comboboxItem} />;
};

export default DataClassSelector;
