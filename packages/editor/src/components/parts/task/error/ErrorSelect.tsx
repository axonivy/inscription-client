import { useEffect, useMemo, useState } from 'react';
import { EMPTY_SELECT_ITEM, Select, SelectItem } from '../../../widgets';
import { useClient, useEditorContext } from '../../../../context';
import { Consumer } from '../../../../types/lambda';

const ErrorSelect = (props: { error: string; updateError: Consumer<string> }) => {
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

  const selectedError = useMemo<SelectItem | undefined>(() => errorItems.find(e => e.value === props.error), [props.error, errorItems]);

  return (
    <div className='error-select'>
      <Select label='Error' items={errorItems} value={selectedError} onChange={item => props.updateError(item.value)} />
    </div>
  );
};

export default ErrorSelect;
