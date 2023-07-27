import { FieldsetInputProps, Select, SelectItem } from '../../../widgets';
import { useEditorContext, useMeta } from '../../../../context';
import { Consumer } from '../../../../types/lambda';

export const IGNROE_EXCEPTION = '>> Ignore Exception' as const;

type ExceptionSelectProps = {
  value: string;
  onChange: Consumer<string>;
  staticExceptions: string[];
  inputProps?: FieldsetInputProps;
};

const ExceptionSelect = ({ value, onChange, staticExceptions, inputProps }: ExceptionSelectProps) => {
  const { context } = useEditorContext();
  const items = [
    ...staticExceptions.map(ex => {
      return { label: ex, value: ex };
    }),
    ...useMeta('meta/workflow/expiryErrors', context, []).data.map<SelectItem>(error => {
      return { label: error.label, value: error.id };
    })
  ];
  const selectedItem = items.find(e => e.value === value) ?? { label: value, value };

  return <Select items={items} value={selectedItem} onChange={item => onChange(item.value)} inputProps={inputProps} />;
};

export default ExceptionSelect;
