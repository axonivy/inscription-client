import { useOpenApi } from '../../../context';
import { Combobox, ComboboxItem, FieldsetInputProps } from '../../../components/widgets';
import { RestPayload } from '@axonivy/inscription-protocol';
import { typesSupportBinary } from './known-types';

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
    <Combobox
      value={value}
      onChange={onChange}
      items={typeItems}
      browserTypes={['datatype']}
      {...props}
      comboboxItem={item => <span>{item.label}</span>}
    />
  );
};
