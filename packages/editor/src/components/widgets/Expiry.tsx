import { useMemo, useEffect, useState } from 'react';
import { useClient, useData, useEditorContext } from '../../context';
import CollapsiblePart from './collapsible/CollapsiblePart';
import LabelInput from './label/LabelInput';
import PrioritySelect from './select/PrioritySelect';
import ResponsibleSelect from './select/ResponsibleSelect';
import Select, { EMPTY_SELECT_ITEM, SelectItem } from './select/Select';

const Expiry = () => {
  const [, timeout, setTimeout] = useData('config/task/expiry/timeout');
  const [, error, setError] = useData('config/task/expiry/error');

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
      <PrioritySelect dataPath='config/task/expiry/priority' />
    </CollapsiblePart>
  );
};

export default Expiry;
