import { useEditorContext, useMeta } from '../../../context';
import { Select, SelectItem, useFieldset } from '../../../components/widgets';
import { PathFieldset } from '../common';
import { useWsRequestData } from './useWsRequestData';

export const WsClientSelect = () => {
  const { config, update } = useWsRequestData();

  const { context } = useEditorContext();
  const items = useMeta('meta/webservice/clients', context, []).data.map<SelectItem>(client => {
    return { label: client.name, value: client.clientId };
  });
  const selectedItem = items.find(i => i.value === config.clientId) ?? { label: config.clientId, value: config.clientId };

  const fieldset = useFieldset();
  return (
    <PathFieldset label='Client' path='clientId' {...fieldset.labelProps}>
      <Select value={selectedItem} onChange={item => update('clientId', item.value)} items={items} inputProps={fieldset.inputProps} />
    </PathFieldset>
  );
};
