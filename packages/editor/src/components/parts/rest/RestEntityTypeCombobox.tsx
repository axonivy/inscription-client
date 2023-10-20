import { useOpenApi } from '../../../context';
import { ComboboxItem, FieldsetInputProps } from '../../../components/widgets';
import { RestPayload } from '@axonivy/inscription-protocol';
import { typesSupportBinary } from './known-types';
import ComboboxWithBrowser from '../../../components/widgets/combobox/ComboboxWithBrowser';

type RestEntityTypeComboboxProps = FieldsetInputProps & {
  value: string;
  onChange: (change: string) => void;
  items: string[];
};

type EntityComboboxItem = ComboboxItem & {
  label: string;
};

export const useShowRestEntityTypeCombo = (types: string[], currentType: string, restPayload?: RestPayload) => {
  const { openApi } = useOpenApi();
  if (!openApi) {
    return true;
  }
  if (restPayload === undefined) {
    return true;
  }
  return typesSupportBinary(types) || restPayload?.type?.type?.fullQualifiedName !== currentType;
};

export const RestEntityTypeCombobox = ({ value, onChange, items, ...props }: RestEntityTypeComboboxProps) => {
  if (!items.includes(value)) {
    items.push(value);
  }
  const typeItems = items.map<EntityComboboxItem>(type => ({ value: type, label: type === '[B' ? 'Array<byte>' : type }));
  return (
    <ComboboxWithBrowser
      value={value}
      onChange={onChange}
      items={typeItems}
      browsers={['datatype']}
      {...props}
      comboboxItem={item => <span>{item.label}</span>}
    />
  );
};
