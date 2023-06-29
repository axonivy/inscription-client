import { useEffect, useMemo, useState } from 'react';
import { EMPTY_SELECT_ITEM, Fieldset, Select, SelectItem, useFieldset } from '../../../widgets';
import { useClient, useEditorContext } from '../../../../context';
import { Consumer } from '../../../../types/lambda';

const ErrorSelect = ({ error, updateError }: { error: string; updateError: Consumer<string> }) => {
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

  const selectedError = useMemo<SelectItem>(
    () => errorItems.find(e => e.value === error) ?? { label: error, value: error },
    [error, errorItems]
  );

  const selectFieldset = useFieldset();

  return (
    <div className='error-select'>
      <Fieldset label='Error' {...selectFieldset.labelProps}>
        <Select
          items={errorItems}
          value={selectedError}
          onChange={item => updateError(item.value)}
          inputProps={selectFieldset.inputProps}
        />
      </Fieldset>
    </div>
  );
};

export default ErrorSelect;
