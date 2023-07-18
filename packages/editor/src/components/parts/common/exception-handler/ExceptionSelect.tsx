import { useEffect, useMemo, useState } from 'react';
import { FieldsetInputProps, Select, SelectItem } from '../../../widgets';
import { useClient, useEditorContext } from '../../../../context';
import { Consumer } from '../../../../types/lambda';

export const IGNROE_EXCEPTION = '>> Ignore Exception' as const;

type ExceptionSelectProps = {
  value: string;
  onChange: Consumer<string>;
  staticExceptions: string[];
  inputProps?: FieldsetInputProps;
};

const ExceptionSelect = ({ value, onChange, staticExceptions, inputProps }: ExceptionSelectProps) => {
  const [items, setItems] = useState<SelectItem[]>([]);
  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.expiryErrors(editorContext.pid).then(errors =>
      setItems([
        ...staticExceptions.map(ex => {
          return { label: ex, value: ex };
        }),
        ...errors.map(error => {
          return { label: error.label, value: error.id };
        })
      ])
    );
  }, [client, editorContext.pid, staticExceptions]);

  const selectedItem = useMemo<SelectItem>(() => items.find(e => e.value === value) ?? { label: value, value }, [value, items]);

  return <Select items={items} value={selectedItem} onChange={item => onChange(item.value)} inputProps={inputProps} />;
};

export default ExceptionSelect;
