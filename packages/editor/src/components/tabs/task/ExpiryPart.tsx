import { useEffect, useMemo, useState } from 'react';
import { CollapsiblePart, EMPTY_SELECT_ITEM, LabelInput, Select, SelectItem } from '../../../components/widgets';
import { useEditorContext, useClient, useTaskData } from '../../../context';
import PrioritySelect from './priority/PrioritySelect';
import ResponsibleSelect from './responsible/ResponsibleSelect';

const ExpiryPart = () => {
  const [, timeout, setTimeout] = useTaskData('expiry/timeout');
  const [, error, setError] = useTaskData('expiry/error');

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
  const selectedError = useMemo(() => errorItems.find(e => e.value === error), [error, errorItems]);

  return (
    <CollapsiblePart collapsibleLabel='Expiry' defaultOpen={false}>
      <LabelInput label='Timeout' htmlFor='timeout'>
        <input
          className='input'
          id='name'
          value={timeout}
          onChange={event => setTimeout(event.target.value)}
          disabled={editorContext.readonly}
        />
      </LabelInput>
      <Select label='Error' items={errorItems} value={selectedError} onChange={item => setError(item.value)} />
      <ResponsibleSelect />
      <PrioritySelect dataPath='expiry/priority' />
    </CollapsiblePart>
  );
};

export default ExpiryPart;
