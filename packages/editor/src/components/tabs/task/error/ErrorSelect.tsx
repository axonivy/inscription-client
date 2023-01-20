import { useEffect, useMemo, useState } from 'react';
import { EMPTY_SELECT_ITEM, Select, SelectItem } from '../../../widgets';
import { useClient, useEditorContext } from '../../../../context';
import { useErrorData } from './useErrorData';

const ErrorSelect = () => {
  const { task, updateError } = useErrorData();

  const [errorItems, setErrorItems] = useState<SelectItem[]>([]);
  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.expiryErrors(editorContext.pid).then(errors =>
      setErrorItems([
        EMPTY_SELECT_ITEM,
        ...errors.map(error => {
          return { label: error.label, value: error.id };
        })
      ])
    );
  }, [client, editorContext.pid]);

  const selectedError = useMemo(() => errorItems.find(e => e.value === task.expiry?.error), [task, errorItems]);

  return (
    <div className='error-select'>
      <Select label='Error' items={errorItems} value={selectedError} onChange={item => updateError(item.value)} />
    </div>
  );
};

export default ErrorSelect;
