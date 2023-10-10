import { useEditorContext, useMeta } from '../../../context';
import { Combobox, ComboboxItem, FieldsetInputProps } from '../../../components/widgets';
import { useRestRequestData } from './useRestRequestData';

type RestEntityTypeComboboxProps = FieldsetInputProps & {
  value: string;
  onChange: (change: string) => void;
  location: 'result' | 'entity';
};

type EntityComboboxItem = ComboboxItem & {
  label: string;
};

export const RestEntityTypeCombobox = ({ value, onChange, location, ...props }: RestEntityTypeComboboxProps) => {
  const { config } = useRestRequestData();
  const { context } = useEditorContext();
  const typeItems = useMeta(
    `meta/rest/${location}Types`,
    { context, clientId: config.target.clientId, method: config.method, path: config.target.path },
    []
  ).data.map<EntityComboboxItem>(type => ({ value: type, label: type === '[B' ? 'Array<byte>' : type }));
  if (!typeItems.find(item => item.value === value)) {
    typeItems.push({ value, label: value });
  }

  return <Combobox value={value} onChange={onChange} items={typeItems} {...props} comboboxItem={item => <span>{item.label}</span>} />;
};
