import type { FieldsetInputProps, SelectItem } from '../../../widgets/index.js';
import { Select } from '../../../widgets/index.js';
import { useMeta, useEditorContext } from '../../../../context/index.js';
import type { Consumer } from '../../../../types/lambda.js';

type ExceptionSelectProps = {
  value: string;
  onChange: Consumer<string>;
  staticExceptions: string[];
  inputProps?: FieldsetInputProps;
};

const ExceptionSelect = ({ value, onChange, staticExceptions, inputProps }: ExceptionSelectProps) => {
  const { elementContext } = useEditorContext();
  const items = [
    ...staticExceptions.map(ex => {
      return { label: ex, value: ex };
    }),
    ...useMeta('meta/workflow/errorStarts', elementContext, []).data.map<SelectItem>(error => {
      return { label: error.label, value: error.id };
    })
  ];
  const selectedItem = items.find(e => e.value === value) ?? { label: value, value };

  return <Select items={items} value={selectedItem} onChange={item => onChange(item.value)} inputProps={inputProps} />;
};

export default ExceptionSelect;
